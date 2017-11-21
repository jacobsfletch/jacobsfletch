import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import './backtotop.css'

class BackToTop extends React.Component {
    constructor() {
        super()
        this.onScroll = this.onScroll.bind(this)
        this.state = {
            scrollContainer: null,
            scrolled: false
        }
    }
    componentDidMount() {
        const container = document.querySelector('*[class^="screen"]')
        container.addEventListener('scroll', this.onScroll, false)
        console.log(this.props.location)
        this.setState({
            scrollContainer: container
        })
    }
    onScroll() {
        const distance = this.state.scrollContainer.scrollTop
        let checker = (distance > 0)
        this.setState({
            scrolled: checker
        })
    }
    onClick() {
        const distanceScrolled = this.state.scrollContainer.scrollTop
        this.state.scrollContainer.scrollTop = 0
    }
    render() {
        const classList = this.state.scrolled ? `backtotop active` : `backtotop`
        return (
            <button className={classList} onClick={(e) => this.onClick(e)}>back to top ^</button>
        )
    }
}


function mapStateToProps(state) {
    return {
        location: state.location
    }
}

export default withRouter(connect(mapStateToProps)(BackToTop))
