import React from 'react';
import Field from '../../modules/field/Field';

import './contact.css';

export default class Contact extends React.Component {
    constructor() {
        super()
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onWheel = this.onWheel.bind(this)
        this.handleChange =  this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            isDisabled: false,
            sent: false,
            firstName: {
                value: '',
                isValid: false,
                errorMessage: ''
            },
            lastName: {
                value: '',
                isValid: false,
                errorMessage: ''
            },
            subject: {
                value: '',
                isValid: false,
                errorMessage: ''
            },
            emailAddress: {
                value: '',
                isValid: false,
                errorMessage: ''
            },
            phoneNumber: {
                value: '',
                isValid: false,
                errorMessage: ''
            }
        }
    }

    onWheel(e) {
        const scrollY = e.deltaY
        const scrollTop = this.screenRef.scrollTop
        this.screenRef.scrollTop = scrollTop + scrollY
    }

    onTouchMove(e) {
        e.stopPropagation()
    }

    handleChange(props) {
        this.setState(props)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({isDisabled: true})
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
        const formClasses = this.state.isDisabled ? 'screen-contact disabled' : 'screen-contact'
        const buttonClasses = this.state.isDisabled ? 'form-button sending' : this.state.sent ? 'form-button sent' : 'form-button'
        const buttonText = this.state.isDisabled ? 'sending...' : this.state.sent ? 'sent successfully' : 'send off'
        const signatureFirst = this.state.firstName.value ? this.state.firstName.value : 'your'
        const signatureLast = this.state.lastName.value ? this.state.lastName.value : 'name'
        return (
            <article className={formClasses} ref={(contact) => { this.screenRef = contact }} onWheel={this.onWheel} onTouchMove={this.onTouchMove}>
                <form id='contact' className='form-contact' onSubmit={this.handleSubmit} noValidate >
                    <h2 className="screen-title">dear jacobsfletch,</h2>
                    <br/><br/>
                    <p>hello, my name is&nbsp;</p>
                    <Field placeholder="first" name='firstName' type='text' handleChange={this.handleChange} />
                    <p> </p>
                    <Field placeholder="last" name='lastName' type='text' handleChange={this.handleChange} />
                    <p>&nbsp;.&nbsp;i am reaching out to you because i would like to&nbsp;</p>
                    <br/><br/>
                    <p>my email address is&nbsp;</p>
                    <Field placeholder="email" name='emailAddress' type='email' handleChange={this.handleChange} />
                    <p>&nbsp;- or you can reach me at&nbsp;</p>
                    <Field placeholder="(555)555-5555" name='phoneNumber' type='tel' maxLength="13" handleChange={this.handleChange} />
                    <br/><br/>
                    <footer className="form-footer">
                        <p>regards,</p>
                        <p>{signatureFirst} {signatureLast}</p>
                    </footer>
                    <br/>
                    <button type="submit" className={buttonClasses} disabled={this.state.isDisabled}>{buttonText}</button>
                </form>
            </article>
        )
    }
}
