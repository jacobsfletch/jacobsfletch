import React, { bindActionCreators } from 'react'
import { Route, Switch} from 'react-router-dom'
import { withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux'

import { screenChanged } from './ScreenActions'

import HomeScreen from './home/HomeScreen'
import PortfolioScreen from './portfolio/PortfolioScreen'
import Project from './project/ProjectScreen'
import PageNotFound from './404/PageNotFound'

class ScreenController extends React.Component {
    changeScreenTitle(screenName) {
        if (screenName === "") {
            screenName = "index"
        }
        let { dispatch } = this.props
        let action = screenChanged(screenName)
        dispatch(action)
    }
    render() {
        return (
            <div className="app-body">
            <Switch>
                <Route exact path='/' render={(props) => (
                    <HomeScreen {...props} changeScreenTitle={this.changeScreenTitle.bind(this)} />
                )}/>
                <Route exact path='/portfolio' render={(props) => (
                    <PortfolioScreen {...props} changeScreenTitle={this.changeScreenTitle.bind(this)} />
                )}/>
                <Route exact path="/portfolio/:projectName" component={Project} changeScreenTitle={this.changeScreenTitle.bind(this)}/>
                <Route path='/404' component={PageNotFound} />
                <Redirect to='/404' />
            </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        mountedScreen: state.mountedScreen
    }
}

export default withRouter(connect(mapStateToProps)(ScreenController))
