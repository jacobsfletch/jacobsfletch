import React, { Component } from 'react'
import screenComponent from '../ScreenComponent'

import ArticleCard from '../../elements/articlecard/'

import './index.css'

const mapStateToProps = state => {
	return state
}

class BlogScreen extends Component {

	render() {

		let articles = this.props.blog.map((article, index) =>
			<ArticleCard
				key={article._id}
				data={article}
				index={index}
			/>
		)

		return (
			<article
				className='screen-blog'
				ref={(thisScreen) => { this.screenRef = thisScreen }}
			>
				<ul className="blog-list">
					{articles}
				</ul>
			</article>
		)
	}
}

export default screenComponent(mapStateToProps, null, BlogScreen)
