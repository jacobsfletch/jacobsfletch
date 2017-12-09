import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import Pencil from './Pencil'

import './sketchpad.css'

class SketchPad extends Component {

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
            canvasActive: false,
            doodleSent: false
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
        // const doodles = this.loadRandomDoodle(this.props.doodles)
        // this.setState({
        //     doodle: doodles ? doodles : '/img/doodle.png'
        // })
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
            canvasActive: true
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

    sendSketch(e) {
        const doodle = this.canvas.toDataURL('image/png', 1)
        const d = new Date()
        const day = d.getDate()
        const month= d.getMonth() + 1
        const year = d.getFullYear()
        const time = d.toLocaleTimeString()
        const date = `doodle-${month}-${day}-${year}-${time}`
        console.log(time)
        e.target.href = doodle
        e.target.download = date
        // fetch('/api/email/doodle', {
        //         method: 'POST',
        //         body: doodle,
        //         headers: {'Content-Type':'application/json'}
        //     })
        //     .then(response => {
        //         if(response.status === 200) { this.clearCanvas(true) }
        //     })
    }

    clearCanvas(sent) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        if(sent) {
            this.setState({
                canvasActive: false,
                doodleSent: true
            })
        } else {
            this.setState({
                canvasActive: false,
                doodleSent: false
            })
        }
    }

    loadRandomDoodle(doodles) {
        if (this.props.doodles) {
            return doodles[Math.floor(Math.random() * doodles.length)];
        }
        // Put this in the props on the canvas element in the render funtion:
        // style={{backgroundImage: 'url(' + this.state.doodle + ')'}}
    }

    render() {
        const toolbeltClasses = this.state.canvasActive ? 'sketchpad-toolbelt active' : 'sketchpad-toolbelt'
        const titleClasses = (this.state.canvasActive && !this.state.doodleSent) ? 'sketchpad-title deactive' : 'sketchpad-title'
        const confirmClasses = this.state.doodleSent ? 'sketchpad-confirm' : 'sketchpad-confirm deactive'
        return (
            <div className='sketchpad'>
                <canvas
                    ref={(canvas) => { this.canvasRef = canvas }}
                    className='sketchpad-canvas'
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseOut={this.onMouseUp}
                    onMouseUp={this.onMouseUp}
                />
                <p className={confirmClasses}>Your doodle has been sent!</p>
                <p className={titleClasses}>Draw me a picture</p>
                <div className={toolbeltClasses}>
                    <a
                        onClick={(e) => this.sendSketch(e)}>Download
                    </a>
                    <button
                        onClick={(e) => this.clearCanvas()}>clear
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        doodles: state.globals.doodles
    }
}

export default connect(mapStateToProps)(SketchPad)
