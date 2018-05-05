import React, { Component } from 'react'

import ContactForm from '../../forms/contact/'

import './index.css'

class Contact extends Component {

	render() {
		return (
			<article className='screen-contact'>
				<ContactForm />
			</article>
		)
	}

}

export default Contact
