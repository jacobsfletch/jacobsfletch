import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import ProjectCard from '../../elements/projectcard/ProjectCard';

import './portfolio.css';

class PortfolioScreen extends React.Component {
    createCards() {
        const projects = this.props.projects
        return (
            projects.map((project) =>
                <ProjectCard key={project.id} projectName={project.title} thumbnailImage={project.thumbnail.src} altText={project.thumbnail.alt}
            />)
        )
    }
    render() {
        return (
            <ul className="screen-portfolio">{this.createCards()}</ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        projects: state.projects
    }
}

export default withRouter(connect(mapStateToProps)(PortfolioScreen))
