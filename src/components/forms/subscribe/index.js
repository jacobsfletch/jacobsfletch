import React from 'react'

import { HandleChange, HandleSubmit } from '../../tools/Form'
import Input from '../../fields/input/'
import Button from '../../elements/button/'

import './index.css';

export default class Subscribe extends React.Component {
	constructor() {
		super()
		this.handleChange = HandleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			status: 200,
			isValid: false,
			inProgress: false,
			showError: false,
			errorMessage: '',
			sent: false,
			form: {
				emailAddress: {
					value: '',
					isValid: false,
					showError: false,
					errorMessage: ''
				}
			}
		}
	}

	handleSubmit(e) {
		const formData = HandleSubmit(e).bind(this)
		console.log(formData)
		fetch('/api/subscribe', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {'Content-Type':'application/json'}
			})
			.then(response => {
				if (response.status == 406) {
					this.setState({
						status: response.status,
						errorMessage: 'Already subscribed!',
						inProgress: false
					})
					return
				} else if (response.status == 200) {
					fetch('/api/email/subscribe', {
							method: 'POST',
							body: JSON.stringify(formData),
							headers: {'Content-Type':'application/json'}
						})
						.then(response => {
							this.setState({
								status: response.status,
								inProgress: false,
								sent: true
							})
						})
					}
			})
		return false
	}

	render() {
		const classes =  'form-subscribe ' + this.props.color
		const formClasses = this.state.inProgress
			? classes +  ' disabled'
			: classes
		const button = 'form-button simple'
		const buttonClasses = this.state.inProgress
			? button + ' sending'
			: this.state.sent
			? button + ' sent'
			: this.state.status != 200
			? button + ' error'
			: button
		const buttonText = this.state.inProgress ? 'subscribing...' : this.state.sent ? 'subscribed' : this.state.status != 200 ? this.state.errorMessage : 'subscribe'
		const overlayClasses = this.state.inProgress ? 'overlay' : 'overlay hidden'

		return (
			<form id='subscribe'
			className={formClasses}
			onSubmit={(e) => this.handleSubmit(e)}
			ref={(form) => { this.formRef = form }}
			noValidate >
				<Input
					placeholder="you@email.com"
					name='emailAddress'
					type='email'
					handleChange={this.handleChange}
					showError={this.state.form.emailAddress.showError}
				/>
				<br />
				<Button buttonClasses={buttonClasses} buttonText={buttonText} disabled={this.state.inProgress} />
				<div className={overlayClasses} />
			</form>
		)
	}
}
