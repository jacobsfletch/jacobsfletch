import React from 'react';
import { connect } from 'react-redux';

import ProjectCard from '../../elements/projectcard/ProjectCard';

import './portfolio.css';

class PortfolioScreen extends React.Component {
    componentDidMount() {
        const screenName = this.props.location.pathname.replace(/\//g, "")
        this.props.changeScreenTitle(screenName)
    }
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

export default connect(mapStateToProps)(PortfolioScreen)
