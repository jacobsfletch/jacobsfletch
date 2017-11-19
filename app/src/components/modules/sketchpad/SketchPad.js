import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Pencil from './Pencil'

import './sketchpad.css'

export default class SketchPad extends Component {

    tool = null
    interval = null

    static defaultProps = {
        color: '#ffffff',
        size: 12,
        debounceTime: 1000,
        tool: Pencil,
        items: []
    }

    constructor(props) {
        super(props)
        this.tool = this.props.tool(this.ctx)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onDebouncedMove = this.onDebouncedMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onResize = this.onResize.bind(this)
        this.state = {
            canvasStatus: false
        }
    }

    componentWillReceiveProps({tool, items}) {
        items.filter(item => this.props.items.indexOf(item) === -1).forEach(item => {
            this.tool = item.tool.props.tool(this.ctx)
            this.tool.draw(item, false)
        })
        this.tool = this.props.tool(this.ctx)
    }

    componentDidMount() {
        this.canvas = findDOMNode(this.canvasRef)
        this.ctx = this.canvas.getContext('2d')
        this.tool = this.props.tool(this.ctx)
        this.onResize()
        window.addEventListener('resize', this.onResize, false)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false)
    }

    onResize() {
        this.canvas = findDOMNode(this.canvasRef)
        const sketchpad = document.querySelector('.sketchpad')
        const sketchpadWidth = sketchpad.clientWidth
        const sketchpadHeight = sketchpad.clientHeight
        this.canvas.width = sketchpadWidth
        this.canvas.height = sketchpadHeight
        this.clearCanvas()
    }

    onMouseDown(e) {
        const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size)
        data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data)
        if (this.props.onDebouncedItemChange) {
            this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime)
        }
        this.setState({
            canvasStatus: true
        })
    }

    onDebouncedMove() {
        if (typeof this.tool.onDebouncedMouseMove === 'function' && this.props.onDebouncedItemChange) {
            this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove())
        }
    }

    onMouseMove(e) {
        const data = this.tool.onMouseMove(...this.getCursorPosition(e))
        data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data)
    }

    onMouseUp(e) {
        const data = this.tool.onMouseUp(...this.getCursorPosition(e))
        data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data)
        if (this.props.onDebouncedItemChange) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    getCursorPosition(e) {
        const {top, left} = this.canvas.getBoundingClientRect()
        return [
            e.clientX - left,
            e.clientY - top
        ]
    }

    sendSketch() {
        console.log('sending...jk asshole')
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.setState({
            canvasStatus: false
        })
    }

    render() {
        const toolbeltClassList = this.state.canvasStatus ? 'sketchpad-toolbelt active' : 'sketchpad-tools'
        const titleClassList = this.state.canvasStatus ? 'sketchpad-title deactive' : 'sketchpad-title'
        return (
            <div className={'sketchpad'}>
                <canvas
                    ref={(canvas) => { this.canvasRef = canvas }}
                    className={'sketchpad-canvas'}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseOut={this.onMouseUp}
                    onMouseUp={this.onMouseUp}
                    style={{backgroundColor: 'black'}}
                />
                <div className={toolbeltClassList}>
                    <button
                        onClick={(e) => this.clearCanvas()}>Clear
                    </button>
                    <button
                        onClick={(e) => this.sendSketch()}>Send
                    </button>
                </div>
                <p className={titleClassList}>draw me something</p>
            </div>
        )
    }
}
