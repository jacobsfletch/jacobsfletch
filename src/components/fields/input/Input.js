import React from 'react'

import Ruler from '../../tools/Ruler'
import Validate from '../../tools/Validate'

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

    updateField(fieldName, e) {
        let stateProp = this.state[fieldName]
        const isValid = Validate(fieldName, e.target.value)
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
        const errorMessage = this.state[this.props.name].errorMessage ? this.state[this.props.name].errorMessage : 'required'
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
