import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { OnWheel, OnTouchMove, OnTouchStart } from '../../../tools/Scroll'
import ArticleCard from '../../elements/articlecard/'

import './index.css'

class BlogScreen extends React.Component {

	constructor() {
		super()
		this.onTouchMove = OnTouchMove.bind(this)
		this.onTouchStart = OnTouchStart.bind(this)
		this.onWheel = OnWheel.bind(this)
		this.state = {
			lastScrollY: 0
		}
	}

	render() {

		let articles = this.props.blog.map((article, index) =>
			<ArticleCard
				key={article._id}
				data={article}
				index={index}
			/>
		)

		return (
			<article className='screen-blog'
				ref={(blog) => { this.screenRef = blog }}
				onWheel={this.onWheel}
				onTouchMove={this.onTouchMove}
				onTouchStart={this.onTouchStart}
			>
				<ul className="blog-list">
					{articles}
				</ul>
			</article>
		)
	}
}

function mapStateToProps(state) {
	return {
		blog: state.blog
	}
}

export default withRouter(connect(mapStateToProps)(BlogScreen))
