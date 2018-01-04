import React from 'react'
import ContactForm from '../../forms/contact/Contact'

import './contact.css'

export default class Contact extends React.Component {
	constructor() {
		super()
		this.onTouchMove = this.onTouchMove.bind(this)
		this.onWheel = this.onWheel.bind(this)
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
		return (
			<article className='screen-contact' ref={(contact) => { this.screenRef = contact }} onWheel={this.onWheel} onTouchMove={this.onTouchMove}>
				<ContactForm />
			</article>
		)
	}
}
