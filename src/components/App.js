import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from './layouts/dock/'
import Header from './layouts/header/'
import Footer from './layouts/footer/'
import ScreenComponent from './screens/ScreenComponent'

import Portfolio from '../data/portfolio'
import Blog from '../data/blog'
import Resume from '../data/resume'
import Globals from '../data/globals'

import './App.css'

const mapStateToProps = state => {
	return {
		scrollTicker: state.specs.scrollTicker,
		orientationTicker: state.specs.orientationTicker,
		touchMoveTicker: state.specs.touchMoveTicker,
		wheelTicker: state.specs.wheelTicker,
		lastScrollY: state.specs.lastScrollY
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getPortfolio: (data) => { dispatch({ type: 'PORTFOLIO_LOADED', payload: data }) },
		getBlog: (data) => { dispatch({ type: 'BLOG_LOADED', payload: data }) },
		getGlobals: (data) => { dispatch({ type: 'GLOBALS_LOADED', payload: data }) },
		getResume: (data) => { dispatch({ type: 'RESUME_LOADED', payload: data }) },
		viewportResized: (size) => { dispatch({ type: 'VIEWPORT_RESIZED', payload: size }) },
		userScrolled: (tick) => { dispatch({ type: 'USER_SCROLLED', payload: tick })},
		userWheeled: (specs) => { dispatch({ type: 'USER_WHEELED', payload: specs })},
		userTouchMoved: (tick) => { dispatch({ type: 'USER_TOUCH_MOVED', payload: tick })},
		deviceRotated: (tick) => { dispatch({ type: 'DEVICE_ROTATED', payload: tick })},
		isTouchDevice: () => { dispatch({ type: 'IS_TOUCH_DEVICE', payload: true }) }
	}
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.setViewportSize = this.setViewportSize.bind(this)
		this.onOrientationChange = this.onOrientationChange.bind(this)
		this.onWheel = this.onWheel.bind(this)
		this.onTouchMove = this.onTouchMove.bind(this)
	}

	componentDidMount() {
		window.addEventListener('resize', this.setViewportSize, false)
		window.addEventListener('orientationchange', this.onOrientationChange, false)
		window.addEventListener('wheel', this.onWheel, false)
		window.addEventListener('touchmove', this.onTouchMove, {passive: false})
		this.checkIfTouchDevice()
		this.setViewportSize()
	}

	checkIfTouchDevice() {
		if('ontouchstart' in window || navigator.msMaxTouchPoints) {
			this.props.isTouchDevice()
		}
	}

	onOrientationChange(e) {
		this.props.deviceRotated(this.props.orientationTicker + 1)
		e.preventDefault()
	}

	onWheel(e) {
		this.props.userWheeled({
			ticker: this.props.wheelTicker + 1,
			deltaY: e.deltaY
		})
		e.preventDefault()
	}

	onTouchMove(e) {
		e.preventDefault()
		this.props.userTouchMoved({
			ticker: this.props.touchMoveTicker + 1,
			thisScroll: e.touches[0].pageY,
			nextScroll: this.props.lastScrollY - e.touches[0].pageY,
			lastScrollY: e.touches[0].pageY
		})
	}

	setViewportSize(e) {
		this.props.viewportResized({
			width: document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight
		})
	}

	componentWillMount() {
		this.props.getPortfolio(Portfolio)
		this.props.getBlog(Blog)
		this.props.getGlobals(Globals)
		this.props.getResume(Resume)
	}

	render() {
		return (
			<div className="app">
				<Dock />
				<Header />
				<ScreenComponent className="screen" />
				<Footer />
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
