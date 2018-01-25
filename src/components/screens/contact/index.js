import React, { Component } from 'react'

import screenComponent from '../ScreenComponent'
import ContactForm from '../../forms/contact/'

import './index.css'

class Contact extends Component {

	render() {
		return (
			<article
				className='screen-contact'
				ref={(thisScreen) => { this.screenRef = thisScreen }}
			>
				<ContactForm />
			</article>
		)
	}

}

export default screenComponent(null, null, Contact)
