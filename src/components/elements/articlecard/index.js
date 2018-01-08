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
		return (
			<li className="article-card" ref={(card) => { this.cardRef = card }}>
				<div className="card-image" ref={(image) => { this.cardImgRef = image }} >
					<Link to={slug} />
				</div>
				<div className="card-meta">
					<time className="card-date">{data.publishedDate}</time>
					<Link to={slug}>
						<h2 className="card-title">{data.title}</h2>
					</Link>
					<p className="card-caption">{data.content.excerpt}</p>
				</div>
				<hr />
			</li>
		)
	}
}
