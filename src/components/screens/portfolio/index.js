import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ProjectCard from '../../elements/projectcard/'

import './index.css'

const mapStateToProps = state => {
	return {
		portfolio: state.data.portfolio,
		isTouchDevice: state.specs.isTouchDevice,
		scrollTicker: state.specs.scrollTicker
	}
}

class PortfolioScreen extends Component {

	render() {
		const classList = this.props.isTouchDevice ? 'screen-portfolio horizontal touchable' : 'screen-portfolio horizontal'
		let projects = this.props.portfolio.map((project, index) =>
			<ProjectCard
				key={project._id}
				data={project}
				index={index}
			/>
		)
		return (
			<ul className={classList}>
				{projects}
			</ul>
		)
	}
}

export default withRouter(connect(mapStateToProps)(PortfolioScreen))
