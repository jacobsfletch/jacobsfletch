import React from 'react';

import './subscribe.css';
import Input from '../../fields/input/Input';

export default class Subscribe extends React.Component {
    constructor() {
        super()
        this.handleChange =  this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        this.setState({inProgress: true})
        let formData = {}
        for (var i in this.state.form) {
            const value = this.state.form[i].value
            formData[i] = value
        }
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
        const formClasses = this.state.inProgress ? 'form-subscribe disabled' : this.state.showError ? 'form-subscribe error' : 'form-subscribe'
        const button = 'form-button simple'
        const buttonClasses = this.state.inProgress ? button + ' sending' : this.state.sent ? button + ' sent' : this.state.status != 200 ? button + ' error' : button
        const buttonText = this.state.inProgress ? 'subscribing...' : this.state.sent ? 'subscribed' : this.state.status != 200 ? this.state.errorMessage : 'subscribe'

        return (
            <form id='subscribe' className={formClasses} onSubmit={this.handleSubmit} noValidate>
                <Input
                    placeholder="you@email.com"
                    name='emailAddress'
                    type='email'
                    handleChange={this.handleChange}
                    showError={this.state.form.emailAddress.showError}
                />
                <br />
                <button type="submit" className={buttonClasses} disabled={this.state.inProgress}>{buttonText}</button>
            </form>
        )
    }
}
