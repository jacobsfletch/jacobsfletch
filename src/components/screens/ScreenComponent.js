import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'

import HomeScreen from './home/'
import DoodleScreen from './doodle/'
import PortfolioScreen from './portfolio/'
import ProjectScreen from './project/'
import BlogScreen from './blog/'
import ShopScreen from './shop/'
import ArticleScreen from './article/'
import Contact from './contact/'
import PageNotFound from './404/'

import { deactivateDock } from '../../SharedActions'

const mapStateToProps = state => {
	return {
		viewportSize: state.specs.viewportSize,
		screenSpecs: state.specs.screenSpecs,
		allMoveTicker: state.specs.allMoveTicker,
		wheelTicker: state.specs.wheelTicker,
		deltaY: state.specs.deltaY
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		routeChanged: (route) => { dispatch({ type: 'ROUTE_CHANGED', payload: route }) },
		deactivateDock: () => { dispatch(deactivateDock()) },
		measureScreen: (specs) => { dispatch({ type: 'SCREEN_MEASURED', payload: specs }) },
		fullyScrolled: () => { dispatch({ type: 'FULLY_SCROLLED' }) },
		fullyUnscrolled: () => { dispatch({ type: 'FULLY_UNSCROLLED' }) }
	}
}

class ScreenComponent extends Component {

	constructor(props) {
		super(props)
		this.bodyRef = React.createRef()
		this.move = 0
		this.lastScrollY = 0
		// this.checkIfFullyScrolled = this.checkIfFullyScrolled.bind(this)
		this.onTouchStart = this.onTouchStart.bind(this)
		this.ratioScrolled = 0
		this.screenNode = null
		this.key = 0
	}

	componentDidMount() {
		console.log('mount')
		this.props.history.listen((location, action) => {
			this.props.routeChanged(location.pathname)
			this.props.deactivateDock()
			this.setScrollSpecs()
			this.key = location.pathname
		})
	}

	componentDidUpdate(prevProps) {
		if(prevProps.viewportSize !== this.props.viewportSize) {
			this.setScrollSpecs()
			console.log('update')
		}
		if(prevProps.allMoveTicker !== this.props.allMoveTicker) {
			// this.checkIfFullyScrolled()
		}
		if(prevProps.touchMoveTicker !== this.props.touchMoveTicker) {
			this.onTouchMove()
		}
		if(prevProps.wheelTicker !== this.props.wheelTicker) {
			this.onWheel()
		}
	}

	onTouchStart(e) {
		e.stopPropagation()
		const thisScroll = e.touches[0].pageY
		this.lastScrollY = thisScroll
	}

	// Touch Move does not come with momentum, so we have to stopPropagation
	onTouchMove(e) {
		this.checkIfFullyScrolled()
		if (!this.props.fullyScrolled && !this.props.fullyUnscrolled) {
			e.stopPropagation()
		}
	}

	// Wheel event comes with momentum, so we can use deltaY explicitly
	onWheel() {
		this.setScrollRatio()
		// If the screen is given the class .horizontal, then horizontallys scroll
		if(this.props.screenSpecs.scrollDirection === 'horizontal') {
			const nextScroll = this.props.screenSpecs.scrollLeft + this.props.deltaY
			this.bodyRef.current.firstChild.scrollLeft = nextScroll
		} else {
			const nextScroll = this.props.screenSpecs.scrollTop + this.props.deltaY
			this.bodyRef.current.firstChild.scrollTop = nextScroll
		}
		this.props.measureScreen({
			...this.props.screenSpecs,
			scrollTop: this.bodyRef.current.firstChild.scrollTop,
			scrollLeft: this.bodyRef.current.firstChild.scrollLeft
		})
	}

	setScrollRatio() {
		const offsetHeight = this.props.screenSpecs.offsetHeight,
			scrollHeight = this.props.screenSpecs.scrollHeight,
			scrollTop = this.props.screenSpecs.scrollTop

		this.ratioScrolled = (offsetHeight + scrollTop) / scrollHeight
		this.props.measureScreen({
			...this.props.screenSpecs,
			scrollTop: this.bodyRef.current.firstChild.scrollTop
		})
	}

	setScrollSpecs() {
		this.screenNode = this.bodyRef.current.firstChild
		const isHorizontal = this.screenNode.classList.contains('horizontal')
		this.props.measureScreen({
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
		})
	}

	render() {
		return (
			<div className="app-body" ref={this.bodyRef} onTouchStart={this.onTouchStart}>
				<Switch>
					<Route exact path='/' render={()=><HomeScreen ref={this.bodyRef}/>} />
					<Route exact path='/doodle' component={DoodleScreen} />
					<Route exact path='/shop' component={ShopScreen}/>
					<Route exact path='/portfolio' render={()=><PortfolioScreen ref={this.bodyRef}/>} />
					<Route exact path='/portfolio/:projectName' component={ProjectScreen} />
					<Route exact path='/blog' component={BlogScreen}/>
					<Route exact path='/blog/:articleName' component={ArticleScreen} />
					<Route exact path='/contact' component={Contact} />
					<Route path='/404' component={PageNotFound} />
					<Redirect to='/404' />
				</Switch>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenComponent))
