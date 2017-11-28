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
    componentWillReceiveProps() {}
    componentDidMount() {
        window.addEventListener('resize', this.refreshVars, false)
        const container = document.querySelector('*[class^="screen"]')
        container.addEventListener('scroll', this.onScroll, false)
        console.log(this.props.location)
        this.setState({scrollContainer: container})
        // this.refreshVars()
    }
    //refreshVars() {
    //    console.log(this.state)
    //    const catainer = this.state.scrollContainer
    //    if(catainer) {
    //        catainer.addEventListener('scroll', this.onScroll, false)
    //    }
    //}
    onScroll() {
        const distance = this.state.scrollContainer.scrollTop
        let checker = (distance > 0)
        this.setState({scrolled: checker})
    }
    onClick() {
        this.state.scrollContainer.scrollTop = 0;
        this.setState({ scrolled: false})
    }
    render() {
        // console.log(this.props.history.location.pathname)
        const classList = this.state.scrolled ? `backtotop active` : `backtotop`
        return (
            <button className={classList} onClick={(e) => this.onClick(e)}>back to top ^</button>
        )
    }
}


function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(BackToTop))
