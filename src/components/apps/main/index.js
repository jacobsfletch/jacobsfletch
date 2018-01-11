import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from '../../layouts/dock/'
import Header from '../../layouts/header/'
import Footer from '../../layouts/footer/'
import ScreenController from '../../screens/ScreenController'

import { getPortfolio, getBlog, getGlobals, getResume, setViewportSize } from '../../../actions/AppActions'
import offlinePortfolio from '../../../data/portfolio'
import offlineBlog from '../../../data/blog'

import './index.css'

class App extends React.Component {

	constructor(props) {
		super(props)
		this.offline = false
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
				<ScreenController className="screen" />
				<Footer />
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getPortfolio: (data) => {
			dispatch(getPortfolio(data))
		},
		getBlog: (data) => {
			dispatch(getBlog(data))
		},
		getGlobals: (data) => {
			dispatch(getGlobals(data))
		},
		getResume: (data) => {
			dispatch(getResume(data))
		},
		setViewportSize: (viewportSize) => {
			dispatch(setViewportSize(viewportSize))
		}
	}
}

export default withRouter(connect(null, mapDispatchToProps)(App))