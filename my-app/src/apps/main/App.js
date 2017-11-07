import React from 'react'
import { connect } from 'react-redux'

import Dock from '../../layouts/dock/Dock'
import Header from '../../layouts/header/header'
import Footer from '../../layouts/footer/footer'
import ScreenController from '../../screens/ScreenController'

import { activateDock } from './AppActions'

import './main.css'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            color: '',
            docked: false,
            screen: ''
        }
    }
    activateDock(color) {
        //if (prevColor === color) {
        //    this.setState({color: '', docked: false})
        //} else {
        //    this.setState({color, docked: true})
        //}
        let { dispatch } = this.props
        let action = activateDock(color)
        dispatch(action)
        const prevColor = color
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

export default connect(mapStateToProps)(App)
