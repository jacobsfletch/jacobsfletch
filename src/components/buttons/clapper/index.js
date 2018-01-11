import React from 'react';
import { connect } from 'react-redux'

import './index.css';

class Clapper extends React.Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			id: '',
			claps: 0,
			identity: '',
			status: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		const project = nextProps.projects.find(project => project._id === nextProps.id)
		const article = nextProps.articles.find(article => article._id === nextProps.id)
		const id = nextProps.id
		const claps = project ? project.claps : article ? article.claps : null
		const identity = project ? "project" : article ? "article" : null
		this.setState({ id, claps, identity })
	}

	handleSubmit(e) {
		if (this.state.status === 'clapping') { return }
		const id = this.state.id
		const slug = this.state.identity
		const url = '/api/clap/' + slug
		const claps = this.state.claps
		this.setState({status: 'clapping', claps: '...'})
		fetch(url, {
				method: 'POST',
				body: JSON.stringify({id}),
				headers: {'Content-Type':'application/json'}
			})
			.then(response => {
				if (response.status === 406) {
					this.setState({status: "failed", claps: claps})
					return
				} else if (response.status === 200) {
					this.setState({status: "clapped", claps: claps + 1})
				}
			})
	}

	render() {
		const buttonClasses = "button-icon " + this.state.status
		return (
			<div className="button-clapper">
				<button onClick={(e) => this.handleSubmit(e)} >
					<svg className={buttonClasses} width="32" height="32" viewBox="0 0 32 32">
						<path className="hand-back" d="M24,20.6c0.2,1.3,0.4,4.7-3,8.1c-4.3,4.3-9.8,1.3-12.3-1.3s-6.8-6.8-6.8-6.8c-0.7-0.7-0.7-1.8,0-2.6l0,0c0.7-0.7,1.8-0.7,2.6,0l4.3,4.3l-6-6c-0.7-0.7-0.7-1.8,0-2.6l0,0c0.7-0.7,1.8-0.7,2.6,0l5.1,5.1l-6.8-6.8c-0.7-0.7-0.7-1.8,0-2.6l0,0c0.7-0.7,1.8-0.7,2.6,0l6.8,6.8l-5.1-5.1c-0.7-0.7-0.7-1.8,0-2.6l0,0C8.5,8,9.7,8,10.4,8.7l7.3,7.3L16,12.7c-0.4-0.9-0.1-2,0.8-2.4l0,0c0.9-0.4,2-0.1,2.4,0.8C19.3,11.1,23.6,17.6,24,20.6z"/>
						<path className="hand-front" d="M24,20.6c0.2,1.3,0.4,4.7-3,8.1c-4.3,4.3-9.8,1.3-12.3-1.3s-6.8-6.8-6.8-6.8c-0.7-0.7-0.7-1.8,0-2.6l0,0c0.7-0.7,1.8-0.7,2.6,0l4.3,4.3l-6-6c-0.7-0.7-0.7-1.8,0-2.6l0,0c0.7-0.7,1.8-0.7,2.6,0l5.1,5.1l-6.8-6.8c-0.7-0.7-0.7-1.8,0-2.6l0,0c0.7-0.7,1.8-0.7,2.6,0l6.8,6.8l-5.1-5.1c-0.7-0.7-0.7-1.8,0-2.6l0,0C8.5,8,9.7,8,10.4,8.7l7.3,7.3L16,12.7c-0.4-0.9-0.1-2,0.8-2.4l0,0c0.9-0.4,2-0.1,2.4,0.8C19.3,11.1,23.6,17.6,24,20.6z"/>
						<line x1="23.5" y1="3.6" x2="25.2" y2="1.9"/>
						<line x1="27.6" y1="5" x2="29.3" y2="3.3"/>
						<line x1="28.4" y1="9.3" x2="30.1" y2="7.6"/>
					</svg>
				</button>
				<p className="button-count">{this.state.claps}</p>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		id: state.id,
		projects: state.portfolio,
		articles: state.blog
	}
}

export default connect(mapStateToProps)(Clapper)
