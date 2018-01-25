import React, { Component } from 'react'
import { connect } from 'react-redux'
import screenComponent from '../ScreenComponent'

import ScreenFooter from '../../layouts/screenFooter'
import Clapper from '../../buttons/clapper'
import Categories from '../../elements/categories'
import Hashtags from '../../elements/hashtags'

import './index.css'

class ArticleScreen extends Component {

	constructor(props) {
		super(props)
		this.state = {
			articleTitle: '',
			article: {
				title: 'loading',
				publishedDate: 'loading',
				content: {
					excerpt: 'loading',
					full: 'loading'
				},
				quote: 'loading',
				quoteAuthor: 'loading',
				categories: [{name:'loading'}],
				tags: [{name:'loading'}],
				hashtags: [{name:'loading'}]
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.data.blog !== nextProps.data.blog) {
			this.updateData(nextProps.data.blog)
		}
		console.log(nextProps.data.blog)
	}

	updateData(blog) {
		if (blog && blog.length > 0) {
			const articleTitle = this.props.match.params.articleName
			const article = blog.find(i => i.slug === articleTitle)
			this.setState({ article })
			this.props.updateId(article._id)
		} else { return }
	}

	componentDidMount() {
		this.updateData(this.props.blog)
	}

	render() {
		const article = this.state.article
		return (
			<section
				className="screen-article"
				ref={(thisScreen) => { this.screenRef = thisScreen }}
			>
				<header className="screen-header">
					<section className="header-body">
						<h1 className="screen-title">{article.title || "no title"}</h1>
						<Categories data={article.categories} />
						<p className="screen-brief">{article.excerpt || "no excerpt"}</p>
						<blockquote className="screen-blockquote">
							<p className="screen-quote">{article.quote || "no quote"}</p>
							<cite className="screen-quoteAuthor">{article.quoteAuthor || "no quote author"}</cite>
						</blockquote>
					</section>
				</header>
				<section className="screen-body">
					<div className="screen-content">
						  <div dangerouslySetInnerHTML={{ __html: article.content.full || "no content"}} />
					</div>
					<Clapper />
				</section>
				<Hashtags data={article.hashtags} />
				<ScreenFooter />
			</section>
		)
	}
}

export default screenComponent(ArticleScreen)
