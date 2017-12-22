import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Dock from '../../layouts/dock/Dock'
import Header from '../../layouts/header/header'
import Footer from '../../layouts/footer/footer'
import ScreenController from '../../screens/ScreenController'

import { getPortfolio, getGlobals, getResume, setViewportSize } from '../../../actions/AppActions'
import offlinePortfolio from '../../offlineData/offlinePortfolio'

import './app.css'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.offline = true
        this.setViewportSize = this.setViewportSize.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.setViewportSize, false)
        window.addEventListener('orientationchange', this.setViewportSize, false)
        window.addEventListener('wheel', this.preventDefault, false)
        window.addEventListener('touchmove', this.preventDefault, {passive: false})
        this.setViewportSize()
    }

    preventDefault(e) {
        e.preventDefault()
    }

    setViewportSize(e) {
        const viewportSize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.props.setViewportSize(viewportSize)
    }

    componentWillMount() {
        if (!this.offline) {
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
        } else {
            this.props.getPortfolio(offlinePortfolio)
            // this.props.getGlobals(data)
            // this.props.getResume(data)
        }
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
        },
        setViewportSize: (viewportSize) => {
            dispatch(setViewportSize(viewportSize))
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
