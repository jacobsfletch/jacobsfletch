import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { OnTouchMove, OnTouchStart, CheckIfFullyScrolled, SetScrollContainerSize } from '../../../tools/Scroll'

import ProjectCard from '../../elements/projectcard/'

import './index.css'

class PortfolioScreen extends Component {

	constructor(props) {
		super(props)
		this.onTouchMove = OnTouchMove.bind(this)
		this.onTouchStart = OnTouchStart.bind(this)
		this.onWheel = this.onWheel.bind(this)
		this.onScroll = this.onScroll.bind(this)
		this.isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints
		this.resizePortfolio = this.props.resizePortfolio.bind(this)
		this.checkIfFullyScrolled = CheckIfFullyScrolled.bind(this)
		this.setScrollContainerSize = SetScrollContainerSize.bind(this)
		this.state = {
			coords: {},
			move: 0,
			portfolioWidth: 0,
			portfolioHeight: 0,
			portfolioOffsetLeft: 0,
			portfolioOffsetTop: 0,
			isFullyScrolled: false,
			scrollHeight: 0,
			scrollWidth: 0
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.viewportSize !== nextProps.viewportSize) {
			this.setScrollContainerSize()
		}
	}

	componentDidMount() {
		this.setScrollContainerSize()
	}

	onScroll() {
		this.checkIfFullyScrolled()
	}

	onWheel(e) {
		const scrollY = e.deltaY
		const scrollLeft = this.screenRef.scrollLeft
		this.screenRef.scrollLeft = scrollLeft + scrollY
		this.checkIfFullyScrolled()
	}

	render() {
		const classList = this.isTouchDevice ? 'screen-portfolio touchable' : 'screen-portfolio'
		let projects = this.props.portfolio.map((project, index) =>
			<ProjectCard
				key={project._id}
				data={project}
				index={index}
				move={this.state.move}
				portfolioOffsetLeft={this.state.portfolioOffsetLeft}
				isTouchDevice={this.isTouchDevice}
				isFullyScrolled={this.state.isFullyScrolled}
			/>
		)
		return (
			<ul
				ref={(screen) => { this.screenRef = screen }}
				className={classList}
				onScroll={this.onScroll}
				onTouchMove={this.onTouchMove}
				onTouchStart={this.onTouchStart}
				onWheel={this.onWheel}
			>
				{projects}
			</ul>
		)
	}
}

function mapStateToProps(state) {
	return {
		portfolio: state.portfolio,
		viewportSize: state.viewportSize
	}
}

function mapDispatchToProps(dispatch) {
	return {
		resizePortfolio: (portfolioSize) => {
			dispatch({
				type: 'RESIZE_PORTFOLIO',
				payload: {
					width: portfolioSize.width,
					height: portfolioSize.height
				}
			})
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen))
