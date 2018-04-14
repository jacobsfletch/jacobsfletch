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

const mapDispatchToProps = (dispatch) => {
	return {
		routeChanged: (route) => { dispatch({ type: 'CHANGE_ROUTE', payload: route }) },
		deactivateDock: () => { dispatch(deactivateDock()) }
	}
}

class ScreenController extends Component {

	constructor(props) {
		super(props)
		this.bodyRef = React.createRef()
	}

	getScreenHeight() {
		console.log(this.bodyRef.current.firstChild.clientHeight)
	}

	componentDidMount() {
		this.getScreenHeight()
		this.props.history.listen((location, action) => {
			this.props.routeChanged(location.pathname)
			this.props.deactivateDock()
			this.getScreenHeight()
		})
	}

	render() {
		return (
			<div className="app-body" ref={this.bodyRef}>
				<Switch>
					<Route exact path='/' component={HomeScreen} />
					<Route exact path='/doodle' component={DoodleScreen} />
					<Route exact path='/shop' component={ShopScreen}/>
					<Route exact path='/portfolio' component={PortfolioScreen}/>
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

export default withRouter(connect(null, mapDispatchToProps)(ScreenController))
