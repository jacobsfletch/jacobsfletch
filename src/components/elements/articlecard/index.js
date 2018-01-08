import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './index.css';

export default class ArticleCard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const slug = `/blog/${this.props.data.slug}`
		const data = this.props.data
		const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' }
		const date = new Date(data.publishedDate).toISOString().slice(0,10).replace(/-/g," ")
		const backgroundImage = { backgroundImage: "url(" + data.featuredImage.toString() + ")" }
		return (
			<li className="article-card" ref={(card) => { this.cardRef = card }}>
				<div className="card-image" style={backgroundImage} >
					<Link to={slug} />
				</div>
				<div className="card-meta">
					<time className="card-date">{date}</time>
					<Link to={slug}>
						<h2 className="card-title">{data.title}</h2>
					</Link>
					<p className="card-caption">{data.content.excerpt}</p>
				</div>
			</li>
		)
	}
}
