import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from '../../layouts/dock/Dock'
import Header from '../../layouts/header/header'
import Footer from '../../layouts/footer/footer'
import ScreenController from '../../screens/ScreenController'

import { getPortfolio } from './AppActions'

import './main.css'

class App extends React.Component {
    componentWillMount() {
        fetch('/api/portfolio')
            .then(results => {
                return results.json()
            }).then(data => {
                this.props.getPortfolio(data)
            })
    }
    render() {
        return (
            <div className="app">
                <Dock />
                <Header />
                <ScreenController className="screen" />
                <Footer />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPortfolio: (data) => {
            dispatch(getPortfolio(data))
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
