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
                this.props.history.push('/contact/confirmation')
            })
        return false
    }

    render() {
        //const disabled = false
        const disabled = (this.state.firstName.isValid && this.state.lastName.isValid && this.state.emailAddress.isValid && this.state.phoneNumber.isValid) ? false : true
        return (
            <article className="screen-contact" ref={(contact) => { this.screenRef = contact }} onWheel={this.onWheel} onTouchMove={this.onTouchMove}>
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
                        <br/>
                        <p>{this.state.firstName.value} {this.state.lastName.value}</p>
                    </footer>
                    <button type="submit" className='form-button' disabled={disabled} >Send Off</button>
                </form>
            </article>
        )
    }
}
