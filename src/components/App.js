import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from './layouts/dock/'
import Header from './layouts/header/'
import Footer from './layouts/footer/'
import ScreenController from './screens/ScreenController'

import Portfolio from '../data/portfolio'
import Blog from '../data/blog'

import './App.css'

const mapDispatchToProps = dispatch => {
	return {
		getPortfolio: (data) => { dispatch({ type: 'LOAD_PORTFOLIO', payload: data }) },
		getBlog: (data) => { dispatch({ type: 'LOAD_BLOG', payload: data }) },
		getGlobals: (data) => { dispatch({ type: 'LOAD_GLOBALS', payload: data }) },
		getResume: (data) => { dispatch({ type: 'LOAD_RESUME', payload: data }) },
		setViewportSize: (viewportSize) => {
			dispatch({
				type: 'WINDOW_RESIZED',
				payload: {
					width: viewportSize.width,
					height: viewportSize.height
				}
			})
		}
	}
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.offline = true
		this.setViewportSize = this.setViewportSize.bind(this)
	}

	componentDidMount() {
		window.addEventListener('resize', this.setViewportSize, false)
		window.addEventListener('orientationchange', this.setViewportSize, false)
		window.addEventListener('wheel', this.preventDefault, false)
		window.addEventListener('touchmove', this.preventDefault, {passive: false})
		this.setViewportSize()
	}

	preventDefault(e) {
		e.preventDefault()
	}

	setViewportSize(e) {
		const viewportSize = {
			width: document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight
		}
		this.props.setViewportSize(viewportSize)
	}

	componentWillMount() {
		this.props.getPortfolio(Portfolio)
		this.props.getBlog(Blog)
		// this.props.getGlobals(data)
		// this.props.getResume(data)
	}

	render() {
		return (
			<div className="app">
				<Dock />
				<Header />
				<ScreenController screenRef={this.props.screenRef} className="screen" />
				<Footer />
			</div>
		)
	}
}

export default withRouter(connect(null, mapDispatchToProps)(App))
