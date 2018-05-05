import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'

import HomeView from './home/'
import DoodleView from './doodle/'
import PortfolioView from './portfolio/'
import ProjectView from './project/'
import BlogView from './blog/'
import ShopView from './shop/'
import ArticleView from './article/'
import Contact from './contact/'
import PageNotFound from './404/'

import { deactivateDock } from '../../SharedActions'

const mapStateToProps = state => {
	return {
		viewportSize: state.specs.viewportSize,
		deltaY: state.specs.deltaY
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// connect user events to redux store
		userScrolled: (tick) => { dispatch({ type: 'USER_SCROLLED', payload: tick })},
		userWheeled: (specs) => { dispatch({ type: 'USER_WHEELED', payload: specs })},
		userTouchMoved: (tick) => { dispatch({ type: 'USER_TOUCH_MOVED', payload: tick })},
		// initialize miscellaneous redux actions
		routeChanged: (route) => { dispatch({ type: 'ROUTE_CHANGED', payload: route }) },
		deactivateDock: () => { dispatch(deactivateDock()) },
		screenMeasured: (specs) => { dispatch({ type: 'SCREEN_MEASURED', payload: specs }) },
		fullyScrolled: () => { dispatch({ type: 'FULLY_SCROLLED' }) },
		fullyUnscrolled: () => { dispatch({ type: 'FULLY_UNSCROLLED' }) }
	}
}

class ViewComponent extends Component {

	constructor(props) {
		super(props)
		// initialize refs
		this.bodyRef = React.createRef()
		// bind user event context to event handler
		// this.checkIfFullyScrolled = this.checkIfFullyScrolled.bind(this)
		this.onTouchStart = this.onTouchStart.bind(this)
		this.onTouchMove = this.onTouchMove.bind(this)
		this.onWheel = this.onWheel.bind(this)
		// initialize global variables
		this.move = 0
		this.lastScrollY = 0
		this.ratioScrolled = 0
		this.screenNode = null
		this.key = 0
		this.screenSpecs = {}
	}

	componentDidMount() {
		this.props.history.listen((location, action) => {
			this.props.routeChanged(location.pathname)
			this.props.deactivateDock()
			this.setScreenSpecs()
			this.key = location.pathname
		})
	}

	componentDidUpdate(prevProps) {
		if(prevProps.viewportSize !== this.props.viewportSize) {
			this.setScreenSpecs()
		}
	}

	setScreenSpecs() {
		this.screenNode = this.bodyRef.current.firstChild
		const isHorizontal = this.screenNode.classList.contains('horizontal')
		const screenSpecs = {
			clientHeight: this.screenNode.clientHeight,
			clientWidth: this.screenNode.clientWidth,
			offsetHeight: this.screenNode.offsetHeight,
			offsetLeft: this.screenNode.getBoundingClientRect().x,
			offsetWidth: this.screenNode.offsetWidth,
			scrollHeight: this.screenNode.scrollHeight,
			scrollWidth: this.screenNode.scrollWidth,
			scrollTop: this.screenNode.scrollTop,
			scrollLeft: this.screenNode.scrollLeft,
			scrollDirection: isHorizontal ? 'horizontal' : 'vertical'
		}
		this.props.screenMeasured(screenSpecs)
		this.screenSpecs = screenSpecs
	}

	// Wheel event comes with momentum, so we can use deltaY explicitly
	onWheel() {
		// If the screen is given the class .horizontal, then horizontallys scroll
		if(this.screenSpecs.scrollDirection === 'horizontal') {
			const nextScroll = this.screenSpecs.scrollLeft + this.props.deltaY
			this.bodyRef.current.firstChild.scrollLeft = nextScroll
		} else {
			const nextScroll = this.screenSpecs.scrollTop + this.props.deltaY
			this.bodyRef.current.firstChild.scrollTop = nextScroll
		}
		const screenSpecs = {
			...this.screenSpecs,
			scrollLeft: this.bodyRef.current.firstChild.scrollLeft,
			scrollTop: this.bodyRef.current.firstChild.scrollTop
		}
		this.props.screenMeasured(screenSpecs)
		this.screenSpecs = screenSpecs
		this.setScrollRatio()
	}

	onTouchStart(e) {
		e.stopPropagation()
		const thisScroll = e.touches[0].pageY
		this.lastScrollY = thisScroll
	}

	// Touch Move does not come with momentum, so we have to stopPropagation
	onTouchMove(e) {
		e.stopPropagation()
		// this.checkIfFullyScrolled()
		// if (!this.props.fullyScrolled && !this.props.fullyUnscrolled) {
		// 	e.stopPropagation()
		// }
	}

	setScrollRatio() {
		const offsetHeight = this.screenSpecs.offsetHeight,
			offsetWidth = this.screenSpecs.offsetWidth,
			scrollHeight = this.screenSpecs.scrollHeight,
			scrollWidth = this.screenSpecs.scrollWidth,
			scrollTop = this.screenSpecs.scrollTop,
			scrollLeft = this.screenSpecs.scrollLeft

		if (this.screenSpecs.scrollDirection === 'horizontal') {
			this.scrollRatio = (offsetWidth + scrollLeft) / scrollWidth
		} else {
			this.scrollRatio = (offsetHeight + scrollTop) / scrollHeight
		}

		const screenSpecs = {
			...this.screenSpecs,
			scrollRatio: this.scrollRatio
		}

		this.props.screenMeasured(screenSpecs)
		this.screenSpecs = screenSpecs
	}

	render() {
		return (
			<div
			className="app-body"
			ref={this.bodyRef}
			onTouchStart={this.onTouchStart}
			onTouchMove={this.onTouchMove}
			onWheel={this.onWheel}>
				<Switch>
					<Route exact path='/' component={HomeView} />
					<Route exact path='/doodle' component={DoodleView} />
					<Route exact path='/shop' component={ShopView}/>
					<Route exact path='/portfolio' component={PortfolioView} />
					<Route exact path='/portfolio/:projectName' component={ProjectView} />
					<Route exact path='/blog' component={BlogView}/>
					<Route exact path='/blog/:articleName' component={ArticleView} />
					<Route exact path='/contact' component={Contact} />
					<Route path='/404' component={PageNotFound} />
					<Redirect to='/404' />
				</Switch>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewComponent))
