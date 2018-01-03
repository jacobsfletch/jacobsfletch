import React from 'react'
import Ruler from '../../tools/ruler/Ruler'

import './input.css'

export default class Input extends React.Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
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

    componentDidMount() {
        Ruler(this.fieldRef)
    }

    validateField(fieldName, value) {
        if (value.length === 0) { return true }
        if (fieldName === 'firstName' || fieldName === 'lastName') {
            const isAlphabetical = /^[a-zA-Z]+$/.test(value)
            if (isAlphabetical) { return true }
            else { return 'alphabet only' }
        } else if (fieldName === 'emailAddress') {
            const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            const addressValid = emailValidator.test(value)
            if (addressValid) { return true }
            else { return 'invalid email' }
        } else if (fieldName === 'phoneNumber') {
            const phoneValidator = /^[(]{0,1}[0-9]{3}[).\- ]{0,1}[0-9]{3}[.\- ]{0,1}[0-9]{4}$/
            const phoneValid = phoneValidator.test(value)
            if (phoneValid) { return true }
            else { return 'invalid phone' }
        }
        else { return true }
    }

    updateField(fieldName, e) {
        let stateProp = this.state[fieldName]
        const isValid = this.validateField(fieldName, e.target.value)
        stateProp.errorMessage = isValid
        if (isValid !== true) {
            e.target.classList.add('invalid')
            stateProp.isValid = false
        } else {
            e.target.classList.remove('invalid')
            stateProp.isValid = true
        }
        stateProp.value = e.target.value
        this.setState({stateProp})
    }

    handleChange(e) {
        switch (this.props.name) {
            case 'firstName':
                this.updateField('firstName', e)
                this.props.handleChange({firstName: this.state.firstName})
                break
            case 'lastName':
                this.updateField('lastName', e)
                this.props.handleChange({lastName: this.state.lastName})
                break
            case 'emailAddress':
                this.updateField('emailAddress', e)
                this.props.handleChange({emailAddress: this.state.emailAddress})
                break
            case 'phoneNumber':
                this.updateField('phoneNumber', e)
                this.props.handleChange({phoneNumber: this.state.phoneNumber})
                break
            default:
                break
            }
        Ruler(e)
    }

    render() {
        const errorClasses = this.props.showError ? 'error-message active' : 'error-message'
        const errorMessage = this.state[this.props.name].errorMessage ? this.state[this.props.name].errorMessage : 'field required'
        const value = this.state[this.props.name].value
        return (
            <span className="input input-text">
                <input
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    type={this.props.type}
                    maxLength={this.props.maxLength}
                    ref={(field) => { this.fieldRef = field }}
                    value={value}
                    onChange={this.handleChange.bind(this)}
                />
                <p className={errorClasses}>{errorMessage}</p>
                <p className="input-ruler" />
            </span>
        )
    }
}