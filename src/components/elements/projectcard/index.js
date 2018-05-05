import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ArrowIcon from '../../icons/arrow'

import './index.css'

const mapStateToProps = state => {
	return {
		viewportSize: state.specs.viewportSize,
		screenSpecs: state.specs.screenSpecs,
		moveTicker: state.specs.moveTicker,
		isTouchDevice: state.specs.isTouchDevice
	}
}

class ProjectCard extends React.Component {

	constructor(props) {
		super(props)
		this.cardRef = React.createRef()
		this.cardImgRef = React.createRef()
		this.cardWidth = 0
		this.cardHeight = 0
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.moveTicker !== nextProps.moveTicker) {
			this.onMove()
		}
	}

	onMove() {
		const isInViewport = this.isInViewport(this.cardRef.current),
			ratioInViewport = isInViewport.ratioInViewport,
			weightedRatio = .75

		if (isInViewport.status && !this.props.isFullyScrolled) {
			this.cardRef.current.classList.add('active')
			if (!this.props.isTouchDevice) {
				let adjustedTransform = weightedRatio * ratioInViewport
				this.cardImgRef.current.style.transform = 'translateX(' + (adjustedTransform * 100) + '%)'
			} else {
				let adjustedTransform =  weightedRatio * ratioInViewport
				this.cardImgRef.current.style.transform = 'translateY(' + (adjustedTransform * 100) + '%)'
			}
		} else {
			this.cardRef.current.classList.remove('active')
		}
	}

	isInViewport(el) {
		let ratio = 0
		const rect = el.getBoundingClientRect(),
			offsetLeft = rect.left - this.props.screenSpecs.offsetLeft,
			offsetRight = rect.right - this.props.screenSpecs.offsetLeft,
			offsetTop = rect.top - this.props.screenSpecs.offsetLeft,
			offsetBottom = rect.bottom - this.props.screenSpecs.offsetLeft

		console.log(rect)

		if (!this.props.isTouchDevice && offsetLeft <= this.props.screenSpecs.offsetWidth && offsetRight >= 0) {
			let computedRatio = Math.round((1 - (offsetLeft / this.props.screenSpecs.offsetWidth)) * 100) / 100
			ratio = (computedRatio > 1) ? (2 - computedRatio) - 1 : 1 - computedRatio
		} else if (this.props.isTouchDevice && offsetTop <= this.props.screenSpecs.offsetHeight && offsetBottom >= 0) {
			let computedRatio = Math.round((1 - (offsetTop / this.props.screenSpecs.offsetHeight)) * 100) / 100
			ratio = (computedRatio > 1) ? (2 - computedRatio) - 1 : 1 - computedRatio
		}

		return {
			status:
				(offsetBottom >= 0 &&
				offsetRight >= 0 &&
				offsetTop <= this.props.screenSpecs.offsetHeight &&
				offsetLeft <= this.props.screenSpecs.offsetWidth),
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
			<li className="project-card" ref={this.cardRef}>
				<p className="card-index">{index}</p>
				<div className="card-image" ref={this.cardImgRef} >
					<Link to={slug} style={image} />
					<div className="image-background">
						<span className="magenta" />
						<span className="cyan" />
					</div>
				</div>
				<div className="card-meta">
					<h5 className="card-client">{client}</h5>
					<Link to={slug}>
						<h5 className="card-title">{this.props.data.title}</h5>
						<ArrowIcon />
					</Link>
				</div>
			</li>
		)
	}
}

export default connect(mapStateToProps)(ProjectCard)
