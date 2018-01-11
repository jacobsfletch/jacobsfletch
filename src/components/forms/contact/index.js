import React from 'react'

import { HandleChange, BuildReqBody, ValidateFields } from '../../tools/Form'
import Input from '../../fields/input'
import Select from '../../fields/select'
import SubmitButton from '../../buttons/submit'

import './index.css'

export default class Form extends React.Component {
	constructor() {
		super()
		this.handleChange = HandleChange.bind(this)
		this.buildReqBody = BuildReqBody.bind(this)
		this.validateFields = ValidateFields.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			status: 200,
			isValid: false,
			inProgress: false,
			showError: false,
			errorMessage: '',
			sent: false,
			validityArray: [],
			reqBody: {},
			form: {
				firstName: {
					value: '',
					isValid: false,
					showError: false,
					errorMessage: ''
				},
				lastName: {
					value: '',
					isValid: false,
					showError: false,
					errorMessage: ''
				},
				subject: {
					value: '',
					isValid: false,
					showError: false,
					errorMessage: ''
				},
				emailAddress: {
					value: '',
					isValid: false,
					showError: false,
					errorMessage: ''
				},
				phoneNumber: {
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
			fetch('/api/email/contact', {
					method: 'POST',
					body: JSON.stringify(this.state.reqBody),
					headers: {'Content-Type':'application/json'}
				})
				.then(response => {
					this.setState({
						inProgress: false,
						sent: true
					})
			})
		} else {
			this.setState({ validityArray: [] })
			return
		}
	}

	render() {
		const formClasses = this.state.inProgress
			? 'form-contact disabled'
			: 'form-contact'
		const button = 'button-form'
		const buttonClasses = this.state.inProgress
			? button + ' sending'
			: this.state.sent
			? button + ' sent'
			: this.state.status !== 200
			? button + ' error'
			: button
		const buttonText = this.state.inProgress
			? 'sending...'
			: this.state.sent
			? 'sent successfully'
			: 'send'
		const signatureFirst = this.state.form.firstName.value
			? this.state.form.firstName.value
			: 'your'
		const signatureLast = this.state.form.lastName.value
			? this.state.form.lastName.value
			: 'name'
		const selectOptions = ['just say hi', 'hire you', 'meet up', 'spam your inbox']
		const overlayClasses = this.state.inProgress
			? 'overlay'
			: 'overlay hidden'
		return (
			<form id='contact'
				className={formClasses}
				onSubmit={this.handleSubmit}
				ref={(form) => { this.formRef = form }}
				noValidate
			>
				<h2 className="screen-title">dear jacobsfletch,</h2>
				<br/><br/>
				<p>hello, my name is&nbsp;</p>
				<Input
					placeholder="first"
					name='firstName'
					type='text'
					handleChange={this.handleChange}
					showError={this.state.form.firstName.showError}
				/>
				<p> </p>
				<Input
					placeholder="last"
					name='lastName'
					type='text'
					handleChange={this.handleChange}
					showError={this.state.form.lastName.showError}
				/>
				<p>&nbsp;.&nbsp;i am reaching out to you because i would like to&nbsp;</p>
				<Select
					options={selectOptions}
					handleChange={this.handleChange}
				/>
				<br/><br/>
				<p>my email address is&nbsp;</p>
				<Input
					placeholder="sexybeast@aol.com"
					name='emailAddress'
					type='email'
					handleChange={this.handleChange}
					showError={this.state.form.emailAddress.showError}
				/>
				<p>&nbsp;- or you can reach me at&nbsp;</p>
				<Input
					placeholder="(555)555-5555"
					name='phoneNumber'
					type='tel'
					maxLength="13"
					handleChange={this.handleChange}
					showError={this.state.form.phoneNumber.showError}
				/>
				<br/><br/>
				<footer className="form-footer">
					<p>regards,</p>
					<p>{signatureFirst} {signatureLast}</p>
				</footer>
				<br/>
				<SubmitButton
					buttonClasses={buttonClasses}
					buttonText={buttonText}
				/>
				<div className={overlayClasses} />
			</form>
		)
	}
}
