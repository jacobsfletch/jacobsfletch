import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import ProjectCard from '../../elements/projectcard/ProjectCard';

import './portfolio.css';

class PortfolioScreen extends React.Component {
    render() {
        let projects = this.props.portfolio.map(project =>
            <ProjectCard key={project._id} data={project} />
        )
        return (
            <ul className="screen-portfolio">{projects}</ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio
    }
}

export default withRouter(connect(mapStateToProps)(PortfolioScreen))
