import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ArrowIcon from '../../icons/arrow'

import './index.css'

const mapStateToProps = state => {
	return {
		viewportSize: state.specs.viewportSize,
		portfolioSize: state.specs.portfolioSize
	}
}

class ProjectCard extends React.Component {

	constructor(props) {
		super(props)
		this.getCardSize = this.getCardSize.bind(this)
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
		if (this.props.move !== nextProps.move) {
			this.onMove()
		}
		if (this.props.viewportSize !== nextProps.viewportSize) {
			this.setState({
				viewportWidth: nextProps.viewportSize.width,
				viewportHeight: nextProps.viewportSize.innerHeight
			})
			this.getCardSize()
		}
		this.setState({
			portfolioWidth: this.props.portfolioSize.width,
			portfolioHeight: this.props.portfolioSize.height,
			portfolioOffsetLeft: this.props.portfolioOffsetLeft
		})
	}

	componentDidMount() {
		this.getCardSize()
	}

	getCardSize() {
		const cardStyles = window.getComputedStyle(this.cardRef)
		this.setState({
			cardWidth: cardStyles.getPropertyValue('width'),
			cardHeight: cardStyles.getPropertyValue('height')
		})
		this.onMove()
	}

	onMove() {
		const isInViewport = this.isInViewport(this.cardRef)
		const ratioInViewport = isInViewport.ratioInViewport
		const weightedRatio = .75
		if (isInViewport.status && !this.props.isFullyScrolled) {
			this.cardRef.classList.add('active')
			if (!this.props.isTouchDevice) {
				let adjustedTransform = weightedRatio * ratioInViewport
				this.cardImgRef.style.transform = 'translateX(' + (adjustedTransform * 100) + '%)'
			} else {
				let adjustedTransform =  weightedRatio * ratioInViewport
				this.cardImgRef.style.transform = 'translateY(' + (adjustedTransform * 100) + '%)'
			}
		} else {
			this.cardRef.classList.remove('active')
		}
	}

	isInViewport(el) {
		let rect = el.getBoundingClientRect()
		let ratio = 0
		const offsetLeft = rect.left - this.state.portfolioOffsetLeft
		const offsetRight = rect.right - this.state.portfolioOffsetLeft
		const offsetTop = rect.top - this.state.portfolioOffsetLeft
		const offsetBottom = rect.bottom - this.state.portfolioOffsetLeft

		if (!this.props.isTouchDevice && offsetLeft <= this.state.portfolioWidth && offsetRight >= 0) {
			let computedRatio = Math.round((1 - (offsetLeft / this.state.portfolioWidth)) * 100) / 100
			ratio = (computedRatio > 1) ? (2 - computedRatio) - 1 : 1 - computedRatio
		} else if (this.props.isTouchDevice && offsetTop <= this.state.portfolioHeight && offsetBottom >= 0) {
			let computedRatio = Math.round((1 - (offsetTop / this.state.portfolioHeight)) * 100) / 100
			ratio = (computedRatio > 1) ? (2 - computedRatio) - 1 : 1 - computedRatio
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
				<div className="card-image" ref={(image) => { this.cardImgRef = image }} >
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
