import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from '../../layouts/dock/Dock'
import Header from '../../layouts/header/header'
import Footer from '../../layouts/footer/footer'
import ScreenController from '../../screens/ScreenController'

import { activateDock } from './AppActions'
import { deactivateDock } from './AppActions'

import './main.css'

class App extends React.Component {
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

export default withRouter(connect(mapStateToProps)(App))
