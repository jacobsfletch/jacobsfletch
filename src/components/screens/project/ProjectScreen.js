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
        const hashtags = !project.hashtags ? 'loading' : project.hashtags.map(function(hashtag){return <li key={hashtag.name} className="board-hashtags">{hashtag.name}</li>})
        const categories = !project.categories ? 'loading' : project.categories.map(function(category){return <li key={category.name} className="board-category">{category.name}</li>})
        const tags = !project.tags ? 'loading' : project.tags.map(function(tag){return <li key={tag.name} className="board-tag">{tag.name}</li>})
        const client = project.client ? project.client : 'personal project'
        const team = project.team ? project.team : 'loading'
        const images = !project.images ? 'loading' : project.images.map(function(image){return <li className="gallery-item" key={image}><img className="board-image" src={image} alt={image}/></li>})
        return (
            <section className="screen-project" onWheel={this.onWheel} onTouchMove={this.onTouchMove} ref={(project) => { this.projectRef = project }}>
                <header className="board-header">
                    <img alt="alt text" className="board-featured" src={project.featuredImage || "loading"} />
                    <section className="header-body">
                        <h5 className="board-client">{client}</h5>
                        <h5 className="board-team">
                            <a href={team.website}>
                                <svg className="team-icon" x="0px" y="0px" viewBox="0 0 16 16">
                                    <line x1="5.2" y1="10.8" x2="10.8" y2="5.2"/>
                                    <polyline points="7.3,5.2 11.9,0.6 15.4,4.1 10.8,8.7 "/>
                                    <polyline points="8.7,10.8 4.1,15.4 0.6,11.9 5.2,7.3 "/>
                                </svg>
                                {team.name}
                            </a>
                        </h5>
                        <h1 className="board-title">{project.title || "loading"}</h1>
                        <ul className="board-categories">{categories}</ul>
                        <p className="board-brief">{project.content || "loading"}</p>
                        <blockquote className="board-blockquote">
                            <p className="board-quote">{project.quote || "loading"}</p>
                            <cite className="board-quoteAuthor">{project.quoteAuthor || "loading"}</cite>
                        </blockquote>
                    </section>
                </header>
                <section className="board-body">
                    <ul className="board-gallery">{images}</ul>
                </section>
                <footer className="board-footer">
                    <div className="board-hashtags">
                        <h3 className="list-title">hashtags</h3>
                        {hashtags}
                    </div>
                </footer>
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
