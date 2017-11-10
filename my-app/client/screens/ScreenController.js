import React from 'react'
import { Route, Switch} from 'react-router-dom'
import { Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'

import { screenChanged } from './ScreenActions'
import { routeChanged } from './ScreenActions'

import HomeScreen from './home/HomeScreen'
import PortfolioScreen from './portfolio/PortfolioScreen'
import ProjectScreen from './project/ProjectScreen'
import PageNotFound from './404/PageNotFound'

class ScreenController extends React.Component {
    componentDidMount() {
        console.log('hi')
    }
    render() {
        return (
            <div className="app-body">
            <Switch>
                <Route exact path='/' component={HomeScreen} />
                <Route exact path='/portfolio' component={PortfolioScreen}/>
                <Route exact path='/portfolio/:projectName' component={ProjectScreen} />
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

export default withRouter(connect(mapStateToProps)(ScreenController))
