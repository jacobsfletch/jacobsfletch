import React from 'react'

import ContactForm from '../../forms/contact/'

import { OnWheel, OnTouchMove } from '../../../tools/Scroll'

import './index.css'

export default class Contact extends React.Component {

	constructor() {
		super()
		this.onTouchMove = OnTouchMove.bind(this)
		this.onWheel = OnWheel.bind(this)
		this.state = {
			lastScrollY: 0
		}
	}

	render() {
		return (
			<article className='screen-contact'
				ref={(contact) => { this.screenRef = contact }}
				onWheel={this.onWheel}
				onTouchMove={this.onTouchMove}
			>
				<ContactForm />
			</article>
		)
	}
}
