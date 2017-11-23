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
        let hashtags = !project.hashtags ? 'loading' : project.hashtags.map(function(tag){return `${tag.name} `})
        let categories = !project.categories ? 'loading' : project.categories.map(function(category){return <li key={category.name} className="board-category">{category.name}</li>})
        let client = project.client ? 'client: ' + project.client : 'personal project'
        let images = !project.images ? 'loading' : project.images.map(function(image){return <li key={image}><img className="board-image" src={image} alt={image}/></li>})
        return (
            <section className="screen-project">
                <header className="board-header">
                    <img alt="alt text" className="board-image" src={project.featuredImage || "loading"} />
                    <h5 className="board-client">{client}</h5>
                    <h1 className="board-title">{project.title || "loading"}</h1>
                    <ul className="board-categories">{categories}</ul>
                </header>
                <div className="board-body">
                    <blockquote className="board-blockquote">
                        <p className="board-quote">{project.quote || "loading"}</p>
                        <cite className="board-quoteAuthor">{project.quoteAuthor || "loading"}</cite>
                    </blockquote>
                    <p className="board-content">{project.content || "loading"}</p>
                    <ul className="board-gallery">{images}</ul>
                    <footer className="board-footer">
                        <p className="board-hashtags"><span>hashtags</span>{hashtags}</p>
                    </footer>
                </div>
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
