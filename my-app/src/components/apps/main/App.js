import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from '../../layouts/dock/Dock'
import Header from '../../layouts/header/header'
import Footer from '../../layouts/footer/footer'
import ScreenController from '../../screens/ScreenController'

import { activateDock } from './AppActions'
import { deactivateDock } from './AppActions'
import { getPortfolio } from './AppActions'

import './main.css'

class App extends React.Component {
    componentWillMount() {
        this.props.changeScreenTitle
        fetch('/api/portfolio')
            .then(results => {
                return results.json()
            }).then(data => {
                this.props.getPortfolio(data)
            })
    }
    componentDidMount() {
    }
    activateDock(color) {
        let { dispatch } = this.props
        if (this.props.dock.color !== color) {
            let action = activateDock(color)
            dispatch(action)
        } else {
            let action = deactivateDock()
            dispatch(action)
        }
    }
    render() {
        return (
            <div className="app">
                <Dock />
                <Header activateDock={this.activateDock.bind(this)} />
                <ScreenController className="screen" />
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dock: state.dock
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPortfolio: (data) => {
            dispatch(getPortfolio(data))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
