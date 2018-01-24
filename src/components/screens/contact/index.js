import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContactForm from '../../forms/contact/'

import { OnWheel, OnTouchMove, OnTouchStart } from '../../../tools/Scroll'

import './index.css'

class Contact extends Component {

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
		return (
			<article className='screen-contact'
				ref={(contact) => { this.screenRef = contact }}
				onWheel={this.onWheel}
				onTouchStart={this.onTouchStart}
				onTouchMove={this.onTouchMove}
			>
				<ContactForm />
			</article>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		userScrolled: (ratio) => {
			dispatch({ type: 'USER_SCROLLED', payload: ratio })
		}
	}
}

export default connect(null, mapDispatchToProps)(Contact)
