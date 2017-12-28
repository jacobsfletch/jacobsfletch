import React from 'react';
import { connect } from 'react-redux';

import Field from '../../modules/field/Field';

import './project.css';

class ProjectScreen extends React.Component {

    constructor(props) {
        super(props)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onWheel = this.onWheel.bind(this)
        this.handleChange =  this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            disabled: true,
            sent: false,
            emailAddress: {
                value: '',
                isValid: false,
                errorMessage: ''
            }
        }
    }

    componentWillMount() {
        this.setState({
            projectTitle: this.props.match.params.projectName
        })
    }

    onWheel(e) {
        const scrollY = e.deltaY
        const scrollTop = this.screenRef.scrollTop
        this.screenRef.scrollTop = scrollTop + scrollY
    }

    onTouchMove(e) {
        e.stopPropagation()
    }

    handleChange(props) {
        this.setState(props)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({isDisabled: true})
        let formData = {}
        for (var i in this.state) {
            const value = this.state[i].value
            formData[i] = value
        }
        fetch('/api/email/subscribe', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {'Content-Type':'application/json'}
            })
            .then(response => {
                this.setState({
                    isDisabled: false,
                    sent: true
                })
            })
        return false
    }

    render() {
        var project = this.props.portfolio.find(project => project.slug === this.state.projectTitle)
        if(!project) { project = {} }
        const categories = !project.categories ? 'loading' : project.categories.map(function(category){return <li key={category.name} className="screen-category">{category.name}</li>})
        const tags = !project.tags ? 'loading' : project.tags.map(function(tag){return <li key={tag.name} className="screen-tag">{tag.name}</li>})
        const client = project.client ? project.client : 'personal project'
        const team = project.team ? project.team : 'loading'

        const images = !project.images ? 'loading' : project.images.map(function(image){return <li className="gallery-item" key={image}><img className="screen-image" src={image} alt={image}/></li>})
        const hashtags = !project.hashtags ? 'loading' : project.hashtags.map(function(hashtag){return <li key={hashtag.name} className="list-item">{hashtag.name}</li>})

        const formClasses = this.state.isDisabled ? 'form-subscribe disabled' : 'form-subscribe'
        const buttonClasses = this.state.isDisabled ? 'form-button simple sending' : this.state.sent ? 'form-button simple sent' : 'form-button simple'
        const buttonText = this.state.isDisabled ? 'subscribing...' : this.state.sent ? 'subscribed' : 'subscribe'

        return (
            <section className="screen-project"
                onWheel={this.onWheel}
                onTouchMove={this.onTouchMove}
                ref={(project) => { this.screenRef = project }}>
                <header className="screen-header">
                    <img alt="alt text" className="screen-featured" src={project.featuredImage || "loading"} />
                    <section className="header-body">
                        <h5 className="screen-client">{client}</h5>
                        <h5 className="screen-team">
                            <a href={team.website}>
                                <svg className="team-icon" x="0px" y="0px" viewBox="0 0 16 16">
                                    <line x1="5.2" y1="10.8" x2="10.8" y2="5.2"/>
                                    <polyline points="7.3,5.2 11.9,0.6 15.4,4.1 10.8,8.7 "/>
                                    <polyline points="8.7,10.8 4.1,15.4 0.6,11.9 5.2,7.3 "/>
                                </svg>
                                {team.name}
                            </a>
                        </h5>
                        <h1 className="screen-title">{project.title || "loading"}</h1>
                        <ul className="screen-categories">{categories}</ul>
                        <p className="screen-brief">{project.content || "loading"}</p>
                        <blockquote className="screen-blockquote">
                            <p className="screen-quote">{project.quote || "loading"}</p>
                            <cite className="screen-quoteAuthor">{project.quoteAuthor || "loading"}</cite>
                        </blockquote>
                    </section>
                </header>
                <section className="screen-body">
                    <ul className="screen-gallery">{images}</ul>
                </section>
                <section className="screen-hashtags">
                    <h3 className="list-title">hashtags</h3>
                    {hashtags}
                </section>
                <footer className="screen-footer">
                    <form id='subscribe' className={formClasses} onSubmit={this.handleSubmit} noValidate>
                        <Field placeholder="you@email.com" name='emailAddress' type='email' handleChange={this.handleChange} />
                        <br /><br />
                        <button type="submit" className={buttonClasses} disabled={this.state.isDisabled}>{buttonText}</button>
                    </form>
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
