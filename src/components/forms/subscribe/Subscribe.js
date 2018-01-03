import React from 'react'

import { HandleChange, HandleSubmit } from '../../tools/Form'
import Input from '../../fields/input/Input'
import Button from '../../elements/button/Button'

import './subscribe.css';

export default class Subscribe extends React.Component {
    constructor() {
        super()
        this.handleChange = HandleChange.bind(this)
        this.handleSubmit = HandleSubmit.bind(this)
        this.state = {
            status: 200,
            isValid: false,
            showError: false,
            errorMessage: '',
            sent: false,
            form: {
                emailAddress: {
                    value: '',
                    isValid: false,
                    errorMessage: ''
                }
            }
        }
    }

    handleSubmit(e) {
        const formData = HandleSubmit(e)
        return
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
        const formClasses = this.state.inProgress ? 'form-subscribe disabled' : 'form-subscribe'
        const button = 'form-button simple'
        const buttonClasses = this.state.inProgress ? button + ' sending' : this.state.sent ? button + ' sent' : this.state.status != 200 ? button + ' error' : button
        const buttonText = this.state.inProgress ? 'subscribing...' : this.state.sent ? 'subscribed' : this.state.status != 200 ? this.state.errorMessage : 'subscribe'

        return (
            <form id='subscribe'
            className={formClasses}
            onSubmit={this.handleSubmit}
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
            </form>
        )
    }
}
