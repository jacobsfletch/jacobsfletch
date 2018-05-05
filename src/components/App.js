import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from './layouts/dock/'
import Header from './layouts/header/'
import Footer from './layouts/footer/'
import ViewComponent from './views/ViewComponent'

import Portfolio from '../data/portfolio'
import Blog from '../data/blog'
import Resume from '../data/resume'
import Globals from '../data/globals'

import './App.css'

const mapDispatchToProps = dispatch => {
	return {
		// load sitewide data into redux store
		getPortfolio: (data) => { dispatch({ type: 'PORTFOLIO_LOADED', payload: data }) },
		getBlog: (data) => { dispatch({ type: 'BLOG_LOADED', payload: data }) },
		getGlobals: (data) => { dispatch({ type: 'GLOBALS_LOADED', payload: data }) },
		getResume: (data) => { dispatch({ type: 'RESUME_LOADED', payload: data }) },
		// connect user events to redux store
		viewportMeasured: (size) => { dispatch({ type: 'VIEWPORT_MEASURED', payload: size }) },
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
		// bind the context of user events to their event handlers
		this.setViewportSize = this.setViewportSize.bind(this)
		this.onOrientationChange = this.onOrientationChange.bind(this)
		this.onWheel = this.onWheel.bind(this)
		this.onTouchMove = this.onTouchMove.bind(this)
		// initialize global variables
		this.viewportSpecs = {}
		this.orientationTicker = 0
		this.wheelTicker = 0
		this.touchMoveTicker = 0
		this.lastScrollY = 0
	}

	componentDidMount() {
		this.checkIfTouchDevice()
		this.setViewportSize()
		window.addEventListener('resize', this.setViewportSize, false)
		window.addEventListener('orientationchange', this.onOrientationChange, false)
		// Unfortunately must bind these two event listeners to the window object
		// in order to prevent the default behaviour of browsers.
		// The ViewComponent also has these events and more, so that the scroll
		// is constrained to the view's dom node and excludes the border.
		window.addEventListener('wheel', this.onWheel, false)
		window.addEventListener('touchmove', this.onTouchMove, {passive: false})
	}

	checkIfTouchDevice() {
		if('ontouchstart' in window || navigator.msMaxTouchPoints) {
			this.props.isTouchDevice()
		}
	}

	setViewportSize(e) {
		const viewportSpecs = {
			width: document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight
		}
		this.props.viewportMeasured(viewportSpecs)
		this.viewportSpecs = viewportSpecs
	}

	onOrientationChange(e) {
		this.orientationTicker++
		this.props.deviceRotated(this.orientationTicker)
		e.preventDefault()
	}

	onWheel(e) {
		this.wheelTicker++
		this.props.userWheeled({
			ticker: this.wheelTicker,
			deltaY: e.deltaY
		})
		e.preventDefault()
	}

	onTouchMove(e) {
		e.preventDefault()
		this.touchMoveTicker++
		const scrollY = e.touches[0].pageY
		this.props.userTouchMoved({
			ticker: this.touchMoveTicker,
			thisScroll: e.touches[0].pageY,
			nextScroll: this.lastScrollY - scrollY,
			lastScrollY: scrollY
		})
		this.lastScrollY = scrollY
	}

	componentWillMount() {
		// fire redux actions to load sitewide data into global store
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
				<ViewComponent className="screen" />
				<Footer />
			</div>
		)
	}
}

export default withRouter(connect(null, mapDispatchToProps)(App))
