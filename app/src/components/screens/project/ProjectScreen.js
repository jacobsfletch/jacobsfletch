import React from 'react';
import { connect } from 'react-redux';

import './project.css';

class ProjectScreen extends React.Component {
    componentWillMount() {
        this.setState({
            projectTitle: this.props.match.params.projectName
        })
    }
    render() {
        var project = this.props.portfolio.find(project => project.slug === this.state.projectTitle)
        if(!project) { project = {} }
        var hashtags = !project.hashtags ? 'loading' : project.hashtags.map(function(tag){return `${tag.name} `})
        return (
            <section className="screen-project">
                <img alt="alt text" className="project-image" src={project.featuredImage || "loading"} />
                <h1 className="project-title">{project.title || "loading"}</h1>
                <p className="project-categories">{project.categories || "loading"}</p>
                <p className="project-quote">{project.quote || "loading"}</p>
                <p className="project-quoteAuthor">{project.quoteAuthor || "loading"}</p>
                <p className="project-content">{project.content || "loading"}</p>
                <p className="project-content">{hashtags}</p>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio
    }
}
export default connect(mapStateToProps)(ProjectScreen)
