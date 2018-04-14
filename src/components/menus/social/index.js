import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import './index.css'

const mapStateToProps = state => {
	return {
		globals: state.data.globals
	}
}

class Social extends React {

	constructor() {
		super()
		this.state = {
			github: '',
			instagram: '',
			dribbble: '',
			behancet: '',
			steemit: '',
			medium: ''
		}
	}

	componentWillReceiveProps() {
		this.setState({
			github: this.props.globals.github,
			instagram: this.props.globals.instagram,
			dribbble: this.props.globals.dribbble,
			behance: this.props.globals.behance,
			steemit: this.props.globals.steemit,
			medium: this.props.globals.medium
		})
	}

	render() {
		return (
			<nav className="menu-social">
				<ul>
					<li className="menu-item">
						<a href={this.state.github} target="_blank">github</a>
					</li>
					<li className="menu-item">
						<a href={this.state.instagram} target="_blank">instagram</a>
					</li>
					<li className="menu-item">
						<a href={this.state.dribbble} target="_blank">dribbble</a>
					</li>
					<li className="menu-item">
						<a href={this.state.behance} target="_blank">behance</a>
					</li>
					<li className="menu-item">
						<a href={this.state.steemit} target="_blank">steemit</a>
					</li>
					<li className="menu-item">
						<a href={this.state.medium} target="_blank">medium</a>
					</li>
				</ul>
			</nav>
		)
	}
}

export default withRouter(connect(mapStateToProps)(Social))
