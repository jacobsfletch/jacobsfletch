import React from 'react';
import { Link } from 'react-router-dom';

import './projectcard.css';

export default class ProjectCard extends React.Component {
    constructor(props) {
        super(props)
        this.getImageDimensions = this.getImageDimensions.bind(this)
        this.state = {
            portfolioWidth: this.props.portfolioWidth,
            portfolioHeight: this.props.portfolioHeight,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            portfolioOffsetLeft: this.props.portfolioOffsetLeft,
            imageWidth: null,
            imageHeight: null
        }
    }
    componentDidMount() {
        this.getImageDimensions()
        window.addEventListener('resize', this.getImageDimensions)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.getImageDimensions)
    }
    getImageDimensions() {
        const image = window.getComputedStyle(this.cardImgRef)
        this.cardImgRef.style.width = ''
        this.cardImgRef.style.height = ''
        this.setState({
            imageWidth: image.getPropertyValue('width'),
            imageHeight: image.getPropertyValue('height'),
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
        })
        this.onMove()
    }
    onMove() {
        if(this.cardRef) {
            const payload = this.isInViewport(this.cardRef)
            const transform = payload.ratioInViewport
            const imageWidth = this.state.imageWidth
            const imageHeight = this.state.imageHeight
            if (payload.status && !this.props.isFullyScrolled) {
                this.cardRef.classList.add('active')
                if (!this.props.isTouchDevice) {
                    let style = parseInt(imageWidth, 10) * transform
                    this.cardImgRef.style.width = style + 'px'
                } else {
                    let style = parseInt(imageHeight, 10) * transform
                    this.cardImgRef.style.height = style + 'px'
                }
            } else {
                this.cardRef.classList.remove('active')
            }
        }
    }
    isInViewport(el) {
        let rect = el.getBoundingClientRect();
        const offsetLeft = rect.left - this.state.portfolioOffsetLeft
        const offsetRight = rect.right - this.state.portfolioOffsetLeft
        const offsetTop = rect.top - this.state.portfolioOffsetLeft
        const offsetBottom = rect.bottom - this.state.portfolioOffsetLeft
        var ratio = 1
        if (!this.props.isTouchDevice && offsetLeft <= this.state.portfolioWidth && offsetRight >= 0) {
            let computedRatio = Math.round((1 - (offsetLeft / this.state.portfolioWidth)) * 100) / 100
            var ratio = (computedRatio > 1) ? 2 - computedRatio : computedRatio
        } else if (this.props.isTouchDevice && offsetTop <= this.state.portfolioHeight && offsetBottom >= 0) {
            let computedRatio = Math.round((1 - (offsetTop / this.state.portfolioHeight)) * 100) / 100
            var ratio = (computedRatio > 1) ? 2 - computedRatio : computedRatio
        }
        return {
           status:
               (offsetBottom >= 0 &&
               offsetRight >= 0 &&
               offsetTop <= this.state.portfolioHeight &&
               offsetLeft <= this.state.portfolioWidth),
           ratioInViewport: ratio
        }
    }
    render() {
        const wheel = this.props.move ? this.onMove() : ''
        const slug = `/portfolio/${this.props.data.slug}`
        const index = this.props.index + 1
        const newIndex = index < 10 ? "0" + index : index
        const client = this.props.data.clients ? this.props.data.clients.name : 'no client'
        const image = {backgroundImage: "url('" + this.props.data.featuredImage + "')"}
        return (
            <li className="project-card" ref={(card) => { this.cardRef = card }}>
                <p className="card-index">{newIndex}</p>
                <div className="card-image" style={image} ref={(cardImg) => { this.cardImgRef = cardImg }}/>
                <div className="card-meta">
                    <h5 className="card-client">{client}</h5>
                    <Link to={slug}>
                        <h5 className="card-title">{this.props.data.title}</h5>
                    </Link>
                </div>
            </li>
        )
    }
}
