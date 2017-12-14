import React from 'react';
import { connect } from 'react-redux';

import './project.css';

class ProjectScreen extends React.Component {
    componentWillMount() {
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onWheel = this.onWheel.bind(this)
        this.setState({
            projectTitle: this.props.match.params.projectName
        })
    }
    onWheel(e) {
        const scrollY = e.deltaY
        const scrollTop = this.projectRef.scrollTop
        this.projectRef.scrollTop = scrollTop + scrollY
    }
    onTouchMove(e) {
        e.stopPropagation()
    }
    render() {
        var project = this.props.portfolio.find(project => project.slug === this.state.projectTitle)
        if(!project) { project = {} }
        let hashtags = !project.hashtags ? 'loading' : project.hashtags.map(function(hashtag){return <li key={hashtag.name} className="board-hashtags">{hashtag.name}</li>})
        let categories = !project.categories ? 'loading' : project.categories.map(function(category){return <li key={category.name} className="board-category">{category.name}</li>})
        let tags = !project.tags ? 'loading' : project.tags.map(function(tag){return <li key={tag.name} className="board-tag">{tag.name}</li>})
        let client = project.client ? 'client: ' + project.client : 'personal project'
        let team = project.team ? project.team : 'loading'
        let images = !project.images ? 'loading' : project.images.map(function(image){return <li key={image}><img className="board-image" src={image} alt={image}/></li>})
        return (
            <section className="screen-project" onWheel={this.onWheel} onTouchMove={this.onTouchMove} ref={(project) => { this.projectRef = project }}>
                <header className="board-header">
                    <img alt="alt text" className="board-image" src={project.featuredImage || "loading"} />
                    <div className="header-body">
                        <h5 className="board-client">{client}</h5>
                        <h1 className="board-title">{project.title || "loading"}</h1>
                        <p className="board-brief">{project.content || "loading"}</p>
                        <blockquote className="board-blockquote">
                            <p className="board-quote">{project.quote || "loading"}</p>
                            <cite className="board-quoteAuthor">{project.quoteAuthor || "loading"}</cite>
                        </blockquote>
                        <div className="board-meta">
                            <ul className="board-team">
                                <h3 className="list-title">team</h3>
                                <a href={team.website} className="team-link">{team.name}</a>
                            </ul>
                            <ul className="board-categories">
                                <h3 className="list-title">categories</h3>
                                {categories}
                            </ul>
                            <ul className="board-tags">
                                <h3 className="list-title">tags</h3>
                                {tags}
                            </ul>
                        </div>
                    </div>
                </header>
                <div className="board-body">
                    <ul className="board-gallery">{images}</ul>
                    <footer className="board-footer">
                        <div className="board-hashtags">
                            <h3 className="list-title">hashtags</h3>
                            {hashtags}
                        </div>
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
