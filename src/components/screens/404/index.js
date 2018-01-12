import React from 'react';

import './index.css';

import { OnWheel, OnTouchMove } from '../../../tools/Scroll'

export default class PageNotFound extends React.Component {

	constructor(props) {
		super(props)
		this.onTouchMove = OnTouchMove.bind(this)
		this.onWheel = OnWheel.bind(this)
	}

	render() {
		return (
			<section className="screen-404"
				ref={(home) => { this.screenRef = home }}
				onWheel={this.onWheel}
				onTouchMove={this.onTouchMove}
			>
				<p>404 Page Note Found</p>
			</section>
		)
	}
}
