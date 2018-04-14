import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import './index.css'

const = mapStateToProps = state => {
	return {
		route: state.specs.route
	}
}

class BackToTop extends React {

	constructor() {
		super()
		this.onScroll = this.onScroll.bind(this)
		this.state = {
			scrollContainer: null,
			scrolled: false,
			distance: 0,
		}
	}
	componentDidUpdate(previousProps) {
		let scrollContainer = document.querySelector('*[class^="screen"]')
		if (previousProps.scrollContainer === this.state.scrollContainer) {
			console.log(previousProps.scrollContainer)
			this.setState({
				scrollContainer
			})
		}
		console.log(this.state.scrollContainer)
	}
	componentDidMount() {
		window.addEventListener('resize', this.onWindowResize, false)
		//console.log(this.props)
	}
	componentWillUnmount() {
		console.log('unmount')
		window.removeEventListener('resize', this.onWindowResize, false)
	}
	onWindowResize() {

	}
	onRouteChange() {
		this.state.scrollContainer.removeEventListener('scroll', this.onScroll, false)
		this.refreshVars()
	}
	refreshVars() {
		let container = this.state.scrollContainer
		this.setState({
			scrollContainer: document.querySelector('*[class^="screen"]')
		})
		if (container) {
			container.addEventListener('scroll', this.onScroll, false)
		}
	}
	onScroll() {
		//console.log('scroll')
		let scrollTop = this.state.scrollContainer.scrollTop
		this.setState({distance: scrollTop})
		let checker = (this.state.distance > 0)
		this.setState({scrolled: checker})
	}
	onClick() {
		this.state.scrollContainer.scrollTop = 0;
		this.setState({ scrolled: false})
	}
	render() {
		const classList = this.state.scrolled ? `backtotop active` : `backtotop`
		return (
			<button className={classList} onClick={(e) => this.onClick(e)}>back to top ^</button>
		)
	}
}

export default withRouter(connect(mapStateToProps)(BackToTop))
