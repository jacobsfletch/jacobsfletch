import React from 'react';
import { connect } from 'react-redux';

import './article.css';

class ProjectScreen extends React.Component {
	componentWillMount() {
		this.setState({
			articleTitle: this.props.match.params.articleName
		})
	}

	render() {
		var article = this.props.blog.find(article => article.slug === this.state.articleTitle)
		if(!article) { article = {} }
		const title = article.title ? article.title : 'loading'
		const excerpt = article.content.excerpt ? article.content.excerpt : 'loading'
		return (
			<section className="screen-article" >
				<header className="board-header">
					<img alt="alt text" className="board-featured" src={article.featuredImage || "loading"} />
					<section className="header-body">
						<h1 className="board-title">{title}</h1>
						<ul className="board-categories">{article.categories || "loading"}</ul>
						<p className="board-brief">{excerpt}</p>
						<blockquote className="board-blockquote">
							<p className="board-quote">{article.quote || "loading"}</p>
							<cite className="board-quoteAuthor">{article.quoteAuthor || "loading"}</cite>
						</blockquote>
					</section>
				</header>
				<footer className="board-footer">
					<div className="board-hashtags">
						<h3 className="list-title">hashtags</h3>
					</div>
				</footer>
			</section>
		)
	}
}

function mapStateToProps(state) {
	return {
		blog: state.blog
	}
}
export default connect(mapStateToProps)(ProjectScreen)
