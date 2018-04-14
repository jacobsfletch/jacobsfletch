import React from 'react'

import { HandleChange, BuildReqBody, ValidateFields } from '../../../tools/Form'
import Input from '../../fields/input'
//import Select from '../../fields/select'
import SubmitButton from '../../buttons/submit'

import './index.css'

class DoodleForm extends React.Component {

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
		return
		/*if (this.state.validityArray.length === 0) {
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
		}*/
	}

	render() {
		const formClasses = !this.props.formActive
			? 'form-doodle hidden'
			: this.state.inProgress
			? 'form-doodle disabled'
			: 'form-doodle'
		const button = 'button-form'
		const buttonClasses = this.state.inProgress
			? button + ' sending'
			: this.state.sent
			? button + ' sent'
			: this.state.status !== 200
			? button + ' error'
			: button
		const buttonText = this.state.inProgress
			? 'folding, stamping, and mailing...'
			: this.state.sent
			? 'got it!'
			: 'send'
		const overlayClasses = this.state.inProgress
			? 'overlay'
			: 'overlay hidden'

		return (
			<form id='doodle'
				className={formClasses}
				onSubmit={this.handleSubmit}
				ref={(form) => { this.formRef = form }}
				noValidate
			>
				<h2 className="screen-title">send me oodles of doodles</h2>
				<br/><br/>
				<Input
					placeholder="Young Joc"
					name='firstName'
					type='text'
					handleChange={this.handleChange}
					showError={this.state.form.firstName.showError}
				/>
				<Input
					placeholder="meetme@themall.com"
					name='emailAddress'
					type='email'
					handleChange={this.handleChange}
					showError={this.state.form.emailAddress.showError}
				/>
				<SubmitButton
					buttonClasses={buttonClasses}
					buttonText={buttonText}
				/>
				<div className={overlayClasses} />
			</form>
		)
	}
}

export default DoodleForm
