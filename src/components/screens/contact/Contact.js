import React from 'react';

import './contact.css';

export default class Contact extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: ''
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        const formData = JSON.stringify(this.state)
        fetch('/api/email/send', {
                method: 'POST',
                body: formData,
                headers: {'Content-Type':'application/json'}
            })
            .then(response => {
                this.props.history.push('/contact/confirmation')
            })
        return false
    }
    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value
        })
    }
    handleLastNameChange(e) {
        this.setState({
            lastName: e.target.value
        })
    }
    handleEmailChange(e) {
        this.setState({
            emailAddress: e.target.value
        })
    }
    render() {
        return (
            <div>
                <p>start by filling out the form below so that i know how to best reach you.</p>
                <form id='contact' className='form-contact' onSubmit={this.handleSubmit.bind(this)} >
                    <input placeholder="first" className='input-text' name='first' type='text' value={this.state.firstName} onChange={this.handleFirstNameChange.bind(this)} required />
                    <input placeholder="last" className='input-text' name='last' type='text' value={this.state.lastName} onChange={this.handleLastNameChange.bind(this)} required />
                    <input placeholder="email" className='input-text' name='email' type='email' value={this.state.emailAddress} onChange={this.handleEmailChange.bind(this)} required />
                    <button type="submit" className='btn-main'>Submit</button>
                </form>
            </div>
        )
    }
}
