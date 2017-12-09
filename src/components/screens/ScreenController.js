import React from 'react'
import { Route, Switch} from 'react-router-dom'
import { Redirect, withRouter } from 'react-router'
import { connect } from 'react-redux'

import HomeScreen from './home/HomeScreen'
import PortfolioScreen from './portfolio/PortfolioScreen'
import ProjectScreen from './project/ProjectScreen'
import Contact from './contact/Contact'
import ContactConfirmation from './contact/ContactConfirmation'
import PageNotFound from './404/PageNotFound'

import { routeChanged } from '../../actions/ScreenActions'
import { deactivateDock } from '../../actions/DockActions'

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
                    <Route exact path='/' component={HomeScreen} />
                    <Route exact path='/portfolio' component={PortfolioScreen}/>
                    <Route exact path='/portfolio/:projectName' component={ProjectScreen} />
                    <Route exact path='/contact' component={Contact} />
                    <Route exact path='/contact/confirmation' component={ContactConfirmation} />
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
            dispatch(routeChanged(route))
        },
        deactivateDock: () => {
            dispatch(deactivateDock())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenController))
