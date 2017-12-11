import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import ProjectCard from '../../elements/projectcard/ProjectCard';

import './portfolio.css';

class PortfolioScreen extends React.Component {
    constructor(props) {
        super(props)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onWheel = this.onWheel.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints
        this.getPortfolioDimensions = this.getPortfolioDimensions.bind(this)
        this.state = {
            coords: {},
            move: 0,
            portfolioWidth: 0,
            portfolioHeight: 0,
            portfolioOffsetLeft: 0,
            portfolioOffsetTop: 0,
            isFullyScrolled: false,
            scrollHeight: 0,
            scrollWidth: 0
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.getPortfolioDimensions)
        this.getPortfolioDimensions()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.getPortfolioDimensions)
    }
    getPortfolioDimensions() {
        this.setState ({
            portfolioHeight: this.portfolioRef.offsetHeight,
            portfolioWidth: this.portfolioRef.offsetWidth,
            portfolioOffsetLeft: this.portfolioRef.getBoundingClientRect().x,
            portfolioOffsetTop: this.portfolioRef.getBoundingClientRect().y,
            scrollHeight: this.portfolioRef.scrollHeight,
            scrollWidth: this.portfolioRef.scrollWidth
        })
        this.scrollCheck()
    }
    onWheel(e) {
        let scrollDown = e.deltaY
        let scrollLeft = this.portfolioRef.scrollLeft
        this.portfolioRef.scrollLeft = scrollLeft + scrollDown
        this.scrollCheck()
    }
    onTouchMove(e) {
        e.stopPropagation()
    }
    onScroll() {
        this.scrollCheck()
    }
    scrollCheck() {
        let scrollTop = this.portfolioRef.scrollTop
        let scrollLeft = this.portfolioRef.scrollLeft
        var check = false
        if(this.isTouchDevice) {
            var check = scrollTop <= 0 || this.state.scrollHeight - scrollTop <= -this.state.portfolioHeight
        } else {
            var check = scrollLeft <= 0 || this.state.scrollWidth - scrollLeft <= -this.state.portfolioWidth + 1
        }
        this.setState({
            move: this.state.move + 1,
            isFullyScrolled: check
        })
    }
    render() {
        let projects = this.props.portfolio.map((project, index) =>
            <ProjectCard key={project._id} data={project} index={index} move={this.state.move} portfolioHeight={this.state.portfolioHeight} portfolioWidth={this.state.portfolioWidth} portfolioOffsetLeft={this.state.portfolioOffsetLeft} isTouchDevice={this.isTouchDevice} isFullyScrolled={this.state.isFullyScrolled} />
        )
        const classList = this.isTouchDevice ? 'screen-portfolio touchable' : 'screen-portfolio'
        return (
            <ul className={classList} onScroll={this.onScroll} onTouchMove={this.onTouchMove} onWheel={this.onWheel} ref={(portfolio) => { this.portfolioRef = portfolio }}>{projects}</ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio
    }
}

export default withRouter(connect(mapStateToProps)(PortfolioScreen))
