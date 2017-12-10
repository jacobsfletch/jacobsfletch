import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import ProjectCard from '../../elements/projectcard/ProjectCard';

import './portfolio.css';

class PortfolioScreen extends React.Component {
    onWheel(e) {
        e.stopPropagation()
        let scrollDown = e.deltaY
        let scrollLeft = this.portfolioRef.scrollLeft
        this.portfolioRef.scrollLeft = scrollLeft + scrollDown
    }
    onTouchMove(e) {
        e.stopPropagation()
    }
    render() {
        let projects = this.props.portfolio.map((project, index) =>
            <ProjectCard key={project._id} data={project} index={index}/>
        )
        return (
            <ul className="screen-portfolio" onTouchMove={(e) => this.onTouchMove(e)} onWheel={(e) => this.onWheel(e)} ref={(portfolio) => { this.portfolioRef = portfolio }}>{projects}</ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio
    }
}

export default withRouter(connect(mapStateToProps)(PortfolioScreen))
