import React from 'react'

import { HandleChange, BuildReqBody, ValidateForm } from '../../tools/Form'
import Input from '../../fields/input/'
import Button from '../../elements/button/'

import './index.css';

export default class Subscribe extends React.Component {
	constructor() {
		super()
		this.handleChange = HandleChange.bind(this)
		this.buildReqBody = BuildReqBody.bind(this)
		this.validateForm = ValidateForm.bind(this)
		this.state = {
			status: 200,
			isValid: false,
			inProgress: false,
			showError: false,
			errorMessage: '',
			sent: false,
			reqBody: {},
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
		e.preventDefault()
		this.validateForm()
		this.buildReqBody()
		if (this.state.isValid) {
			fetch('/api/subscribe', {
					method: 'POST',
					body: JSON.stringify(this.state.reqBody),
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
								body: JSON.stringify(this.state.reqBody),
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
		}
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
