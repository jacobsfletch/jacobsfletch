import React from 'react'
import { connect } from 'react-redux'

import ScreenFooter from '../../layouts/screenFooter/'
import { updateId } from '../../../actions/AppActions'

import './index.css'

class ArticleScreen extends React.Component {

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
		if (this.props.blog !== nextProps.blog) {
			this.updateData(nextProps.blog)
		}
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
		const categories = article.categories.map(function(category) {
			return (
				<li key={category.name} className="screen-category">
					{category.name}
				</li>
			)
		})

		const hashtags = article.hashtags.map(function(hashtag) {
			return (
				<li key={hashtag.name} className="list-item">
					{hashtag.name}
				</li>
			)
		})

		return (
			<section className="screen-article" >
				<header className="board-header">
					<img alt="alt text" className="board-featured" src={article.featuredImage} />
					<section className="header-body">
						<h1 className="board-title">{article.title}</h1>
						<ul className="board-categories">{categories}</ul>
						<p className="board-brief">{article.excerpt}</p>
						<blockquote className="board-blockquote">
							<p className="board-quote">{article.quote}</p>
							<cite className="board-quoteAuthor">{article.quoteAuthor}</cite>
						</blockquote>
					</section>
				</header>
				<section className="screen-hashtags">
					<h3 className="list-title">hashtags</h3>
					{hashtags}
				</section>
				<ScreenFooter />
			</section>
		)
	}
}

function mapStateToProps(state) {
	return {
		blog: state.blog,
		route: state.route
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateId: (id) => {
			dispatch(updateId(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen)
