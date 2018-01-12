import React from 'react'

import { HandleChange, BuildReqBody, ValidateFields } from '../../../tools/Form'
import Input from '../../fields/input'
import SubmitButton from '../../buttons/submit'

import './index.css';

export default class Subscribe extends React.Component {
	constructor() {
		super()
		this.handleChange = HandleChange.bind(this)
		this.buildReqBody = BuildReqBody.bind(this)
		this.validateFields = ValidateFields.bind(this)
		this.state = {
			status: 200,
			isValid: false,
			inProgress: false,
			showError: false,
			errorMessage: '',
			sent: false,
			reqBody: {},
			validityArray: ["false", "false"],
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
		this.validateFields()
		if (this.state.validityArray.length === 0) {
			this.buildReqBody()
			fetch('/api/subscribe', {
					method: 'POST',
					body: JSON.stringify(this.state.reqBody),
					headers: {'Content-Type':'application/json'}
				})
				.then(response => {
					if (response.status === 406) {
						this.setState({
							status: response.status,
							errorMessage: 'Already subscribed!',
							inProgress: false
						})
						return
					} else if (response.status === 200) {
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
		} else {
			this.setState({ validityArray: [] })
			return
		}
	}

	render() {
		const classes =  this.props.color ? 'form-subscribe ' + this.props.color : 'form-subscribe'
		const formClasses = this.state.inProgress
			? classes + ' disabled'
			: classes
		const button = 'button-form simple'
		const buttonClasses = this.state.inProgress
			? button + ' sending'
			: this.state.sent
			? button + ' sent'
			: this.state.status !== 200
			? button + ' error'
			: button
		const buttonText = this.state.inProgress ? 'subscribing...' : this.state.sent ? 'subscribed' : this.state.status !== 200 ? this.state.errorMessage : 'subscribe'
		const overlayClasses = this.state.inProgress ? 'overlay' : 'overlay hidden'

		return (
			<form id='subscribe'
				className={formClasses}
				onSubmit={(e) => this.handleSubmit(e)}
				ref={(form) => { this.formRef = form }}
				noValidate
			>
				<Input
					placeholder="you@email.com"
					name='emailAddress'
					type='email'
					handleChange={this.handleChange}
					showError={this.state.form.emailAddress.showError}
					classes="simple"
				/>
				<br />
				<SubmitButton
					buttonClasses={buttonClasses}
					buttonText={buttonText}
					disabled={this.state.inProgress}
				/>
				<div className={overlayClasses} />
			</form>
		)
	}
}
