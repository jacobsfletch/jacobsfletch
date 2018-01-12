import React from 'react'
import { Route, Switch} from 'react-router-dom'
import { Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'

import HomeScreen from './home/'
import DoodleScreen from './doodle/'
import PortfolioScreen from './portfolio/'
import ProjectScreen from './project/'
import BlogScreen from './blog/'
import ArticleScreen from './article/'
import Contact from './contact/'
import PageNotFound from './404/'

import { deactivateDock } from '../../SharedActions'

class ScreenController extends React.Component {

	componentDidMount() {
		this.props.history.listen((location, action) => {
			this.props.routeChanged(location.pathname)
			this.props.deactivateDock()
		})
	}

	render() {
		return (
			<div className="app-body">
				<Switch>
					<Route exact path='/' component={HomeScreen}  />
					<Route exact path='/doodle' component={DoodleScreen} />
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

function mapStateToProps(state) {
	return state
}

function mapDispatchToProps(dispatch) {
	return {
		routeChanged: (route) => {
			dispatch({ type: 'CHANGE_ROUTE', payload: route })
		},
		deactivateDock: () => {
			dispatch(deactivateDock())
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenController))
