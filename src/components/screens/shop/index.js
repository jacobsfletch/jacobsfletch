import React from 'react';

import './index.css';

import { OnWheel, OnTouchMove, OnTouchStart } from '../../../tools/Scroll'

export default class ShopScreen extends React.Component {

	constructor(props) {
		super(props)
		this.onTouchMove = OnTouchMove.bind(this)
		this.onTouchStart = OnTouchStart.bind(this)
		this.onWheel = OnWheel.bind(this)
	}

	render() {
		return (
			<section className="screen-shop"
				ref={(home) => { this.screenRef = home }}
				onWheel={this.onWheel}
				onTouchMove={this.onTouchMove}
				onTouchStart={this.onTouchStart}
			>
				<p>Shop is under construction</p>
			</section>
		)
	}
}
