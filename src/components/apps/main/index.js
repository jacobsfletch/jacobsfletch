import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from '../../layouts/dock/'
import Header from '../../layouts/header/'
import Footer from '../../layouts/footer/'
import ScreenController from '../../screens/ScreenController'

import offlinePortfolio from '../../../data/portfolio'
import offlineBlog from '../../../data/blog'

import './index.css'

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
		if (!this.offline) {
			fetch('/api/portfolio')
				.then(results => {
					return results.json()
				}).then(data => {
					this.props.getPortfolio(data)
				})
			fetch('/api/blog')
				.then(results => {
					return results.json()
				}).then(data => {
					this.props.getBlog(data)
				})
			fetch('/api/globals')
				.then(results => {
					return results.json()
				}).then(data => {
					this.props.getGlobals(data)
				})
			fetch('/api/resume')
				.then(results => {
					return results.json()
				}).then(data => {
					this.props.getResume(data)
				})
		} else {
			this.props.getPortfolio(offlinePortfolio)
			this.props.getBlog(offlineBlog)
			// this.props.getGlobals(data)
			// this.props.getResume(data)
		}
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

function mapDispatchToProps(dispatch) {
	return {
		getPortfolio: (data) => {
			dispatch({ type: 'LOAD_PORTFOLIO', payload: data })
		},
		getBlog: (data) => {
			dispatch({ type: 'LOAD_BLOG', payload: data })
		},
		getGlobals: (data) => {
			dispatch({ type: 'LOAD_GLOBALS', payload: data })
		},
		getResume: (data) => {
			dispatch({ type: 'LOAD_RESUME', payload: data })
		},
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

export default withRouter(connect(null, mapDispatchToProps)(App))
