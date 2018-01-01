import React from 'react'

import Input from '../../fields/input/Input'
import Select from '../../fields/select/Select'

import './contact.css'

export default class Form extends React.Component {
    constructor() {
        super()
        this.handleChange =  this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            status: 200,
            isValid: false,
            showError: false,
            errorMessage: '',
            isDisabled: false,
            sent: false,
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

    handleChange(props) {
        const newState = {}
        const form = {...this.state.form}
        const key = Object.keys(props)[0]
        form[key] = props[key]
        newState.form = form
        newState.showError = false
        newState.sent = false
        newState.status = 200
        this.setState(newState)
    }

    handleSubmit(e) {
        e.preventDefault()
        for (const key in this.state.form) {
            if (!this.state.form[key].isValid) {
                this.state.form[key].showError = true
                this.setState(this.state.form[key])
            }
        }
        for (const key in this.state.form) {
            if (!this.state.form[key].isValid) {
                return
            }
        }
        this.setState({inProgress: true})
        let formData = {}
        for (var i in this.state) {
            const value = this.state[i].value
            formData[i] = value
        }
        fetch('/api/email/contact', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {'Content-Type':'application/json'}
            })
            .then(response => {
                this.setState({
                    isDisabled: false,
                    sent: true
                })
            })
        return false
    }

    render() {
        const formClasses = this.state.isProgress ? 'form-contact disabled' : 'form-contact'
        const buttonClasses = this.state.isDisabled ? 'form-button sending' : this.state.sent ? 'form-button sent' : 'form-button'
        const buttonText = this.state.isDisabled ? 'sending...' : this.state.sent ? 'sent successfully' : 'send off'
        const signatureFirst = this.state.form.firstName.value ? this.state.form.firstName.value : 'your'
        const signatureLast = this.state.form.lastName.value ? this.state.form.lastName.value : 'name'
        const selectOptions = ['just say hi', 'hire you', 'meet up', 'spam your inbox']
        return (
            <form id='contact' className={formClasses} onSubmit={this.handleSubmit} noValidate >
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
                <Select options={selectOptions} />
                <br/><br/>
                <p>my email address is&nbsp;</p>
                <Input
                    placeholder="email"
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
                <button type="submit" className={buttonClasses} disabled={this.state.isDisabled}>{buttonText}</button>
            </form>
        )
    }
}
