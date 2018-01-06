import React from 'react'
import { connect } from 'react-redux'

import ScreenFooter from '../../layouts/screenFooter/ScreenFooter'
import { updateId } from '../../../actions/AppActions'

import './project.css';

class ProjectScreen extends React.Component {

	constructor(props) {
		super(props)
		this.onTouchMove = this.onTouchMove.bind(this)
		this.onWheel = this.onWheel.bind(this)
		this.state = {
			projectTitle: '',
			project: {
				client: 'loading',
				title: 'loading',
				team: 'loading',
				quote: 'loading',
				quoteAuthor: 'loading',
				featuredImage: 'loading',
				categories: [{name:'loading'}],
				tags: [{name:'loading'}],
				images: [{name:'loading'}],
				hashtags: [{name:'loading'}]
			}
		}
	}

	componentWillMount() {
		this.setState({
			projectTitle: this.props.match.params.projectName
		})
	}

	componentDidMount() {
		let project = this.props.portfolio.find(project => project.slug === this.state.projectTitle)
		this.setState({ project })
		this.props.updateId(project._id)
	}

	onWheel(e) {
		const scrollY = e.deltaY
		const scrollTop = this.screenRef.scrollTop
		this.screenRef.scrollTop = scrollTop + scrollY
	}

	onTouchMove(e) {
		e.stopPropagation()
	}

	render() {
		const project = this.state.project
		const categories = project.categories.map(function(category) {
			return (
				<li key={category.name} className="screen-category">
					{category.name}
				</li>
			)
		})

		const tags = project.tags.map(function(tag){
			return (
				<li key={tag.name} className="screen-tag">
					{tag.name}
				</li>
			)
		})

		const images = project.images.map(function(image) {
			return (
				<li className="gallery-item" key={image}>
					<img className="screen-image" src={image} alt={image}/>
				</li>
			)
		})

		const hashtags = project.hashtags.map(function(hashtag) {
			return (
				<li key={hashtag.name} className="list-item">
					{hashtag.name}
				</li>
			)
		})

		return (
			<section className="screen-project"
				onWheel={this.onWheel}
				onTouchMove={this.onTouchMove}
				ref={(project) => { this.screenRef = project }}>
				<header className="screen-header">
					<img alt="alt text" className="screen-featured" src={project.featuredImage} />
					<section className="header-body">
						<h5 className="screen-client">{project.client}</h5>
						<h5 className="screen-team">
							<a href={project.team.website}>
								<svg className="team-icon" x="0px" y="0px" viewBox="0 0 16 16">
									<line x1="5.2" y1="10.8" x2="10.8" y2="5.2"/>
									<polyline points="7.3,5.2 11.9,0.6 15.4,4.1 10.8,8.7 "/>
									<polyline points="8.7,10.8 4.1,15.4 0.6,11.9 5.2,7.3 "/>
								</svg>
								{project.team.name}
							</a>
						</h5>
						<h1 className="screen-title">{project.title}</h1>
						<ul className="screen-categories">{categories}</ul>
						<p className="screen-brief">{project.content}</p>
						<blockquote className="screen-blockquote">
							<p className="screen-quote">{project.quote}</p>
							<cite className="screen-quoteAuthor">{project.quoteAuthor}</cite>
						</blockquote>
						<span className="screen-arrow" />
					</section>
				</header>
				<section className="screen-body">
					<ul className="screen-gallery">
						{images}
					</ul>
				</section>
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
		portfolio: state.portfolio
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateId: (id) => {
			dispatch(updateId(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)
