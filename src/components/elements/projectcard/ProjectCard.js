import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import './projectcard.css';

class ProjectCard extends React.Component {
    constructor(props) {
        super(props)
        this.getImageSize = this.getImageSize.bind(this)
        this.state = {
            portfolioWidth: 0,
            portfolioHeight: 0,
            viewportWidth: 0,
            viewportHeight: 0,
            portfolioOffsetLeft: 0,
            cardWidth: null,
            cardHeight: null
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.viewportSize !== nextProps.viewportSize) {
            this.setState({
                viewportWidth: nextProps.viewportSize.width,
                viewportHeight: nextProps.viewportSize.innerHeight
            })
            this.getImageSize()
        }
        if (this.props.move !== nextProps.move) {
            this.onMove()
        }
    }
    componentDidMount() {
        this.setState({
            portfolioWidth: this.props.portfolioWidth,
            portfolioHeight: this.props.portfolioHeight,
            portfolioOffsetLeft: this.props.portfolioOffsetLeft
        })
        this.getImageSize()
    }
    getImageSize() {
        const cardStyles = window.getComputedStyle(this.cardRef)
        this.setState({
            cardWidth: cardStyles.getPropertyValue('width'),
            cardHeight: cardStyles.getPropertyValue('height')
        })
        this.onMove()
    }
    onMove() {
        if(this.cardRef) {
            const isInViewport = this.isInViewport(this.cardRef)
            const ratioInViewport = isInViewport.ratioInViewport
            const cardWidth = this.state.cardWidth
            const cardHeight = this.state.cardHeight
            if (isInViewport.status && !this.props.isFullyScrolled) {
                this.cardRef.classList.add('active')
                if (!this.props.isTouchDevice) {
                    //let adjustedTransform = parseInt(cardWidth, 10) * ratioInViewport
                    this.cardImgRef.style.transform = 'translateX(' + ratioInViewport*100 + '%)'
                } else {
                    //let adjustedTransform = parseInt(cardHeight, 10) * ratioInViewport
                    this.cardImgRef.style.transform = 'translateX(' + ratioInViewport*100 + '%)'
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
            var ratio = (computedRatio > 1) ? (2 - computedRatio) - 1 : 1 - computedRatio
        } else if (this.props.isTouchDevice && offsetTop <= this.state.portfolioHeight && offsetBottom >= 0) {
            let computedRatio = Math.round((1 - (offsetTop / this.state.portfolioHeight)) * 100) / 100
            var ratio = (computedRatio > 1) ? (2 - computedRatio) - 1 : 1 - computedRatio
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
        const slug = `/portfolio/${this.props.data.slug}`
        const indexCount = this.props.index + 1
        const index = indexCount < 10 ? "0" + indexCount : indexCount
        const client = this.props.data.clients ? this.props.data.clients.name : 'no client'
        const image = {backgroundImage: "url('" + this.props.data.featuredImage + "')"}
        return (
            <li className="project-card" ref={(card) => { this.cardRef = card }}>
                <p className="card-index">{index}</p>
                <div className="card-image" style={image} ref={(image) => { this.cardImgRef = image }}/>
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

function mapStateToProps(state) {
    return {
        viewportSize: state.viewportSize
    }
}

export default connect(mapStateToProps)(ProjectCard)
