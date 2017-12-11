import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from '../../layouts/dock/Dock'
import Header from '../../layouts/header/header'
import Footer from '../../layouts/footer/footer'
import ScreenController from '../../screens/ScreenController'

import { getPortfolio, getGlobals, getResume } from './AppActions'

import './app.css'

class App extends React.Component {
    componentDidMount() {
        window.addEventListener('touchmove', this.preventDefault);
    }
    componentWillUnmount() {
        window.removeEventListener('touchmove', this.preventDefault);
    }
    preventDefault(e) {
        e.preventDefault()
    }
    componentWillMount() {
        fetch('/api/portfolio')
            .then(results => {
                return results.json()
            }).then(data => {
                this.props.getPortfolio(data)
            })
        fetch('/api/globals')
            .then(results => {
                return results.json()
            }).then(data => {
                this.props.getGlobals(data)
            })
        fetch('/api/resume')
            .then(results => {
                return results.json()
            }).then(data => {
                this.props.getResume(data)
            })
    }
    render() {
        return (
            <section className="app">
                <Dock />
                <Header />
                <ScreenController className="screen" />
                <Footer />
            </section>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPortfolio: (data) => {
            dispatch(getPortfolio(data))
        },
        getGlobals: (data) => {
            dispatch(getGlobals(data))
        },
        getResume: (data) => {
            dispatch(getResume(data))
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
