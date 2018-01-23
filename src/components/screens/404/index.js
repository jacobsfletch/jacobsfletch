import React, {Component } from 'react';

import './index.css';

import { OnWheel, OnTouchMove, OnTouchStart } from '../../../tools/Scroll'

class PageNotFound extends Component {

	constructor(props) {
		super(props)
		this.onTouchMove = OnTouchMove.bind(this)
		this.onTouchStart = OnTouchStart.bind(this)
		this.onWheel = OnWheel.bind(this)
	}

	render() {
		return (
			<section className="screen-404"
				ref={(home) => { this.screenRef = home }}
				onWheel={this.onWheel}
				onTouchMove={this.onTouchMove}
				onTouchStart={this.onTouchStart}
			>
				<p>404 Page Not Found</p>
			</section>
		)
	}
}

export default PageNotFound
