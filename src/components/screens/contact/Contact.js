import React from 'react';

import './contact.css';

export default class Contact extends React.Component {
    constructor() {
        super()
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onWheel = this.onWheel.bind(this)
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleSubjectChange = this.handleSubjectChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
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

    componentDidMount() {
        this.useRuler(this.firstNameRef)
        this.useRuler(this.lastNameRef)
        this.useRuler(this.subjectRef)
        this.useRuler(this.emailRef)
        this.useRuler(this.phoneRef)
    }

    onWheel(e) {
        const scrollY = e.deltaY
        const scrollTop = this.screenRef.scrollTop
        this.screenRef.scrollTop = scrollTop + scrollY
    }

    onTouchMove(e) {
        e.stopPropagation()
    }

    useRuler(e) {
        let element = e.target ? e.target : e
        const ruler = element.parentNode.lastChild
        ruler.innerHTML = element.value ? element.value : element.placeholder
        const rulerWidth = ruler.offsetWidth
        element.style.width = rulerWidth + 8 + 'px'
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
        let stateProp = eval('this.state.' + fieldName)
        const isValid = this.validateField(fieldName, e.target.value)
        stateProp.errorMessage = isValid
        if (isValid !== true) {
            e.target.classList.add('invalid')
            stateProp.isValid = false
        }
        else {
            e.target.classList.remove('invalid')
            stateProp.isValid = true
        }
        stateProp.value = e.target.value
        this.setState({stateProp})
    }

    handleFirstNameChange(e) {
        this.updateField('firstName', e)
        this.useRuler(e)
    }

    handleLastNameChange(e) {
        this.updateField('lastName', e)
        this.useRuler(e)
    }

    handleSubjectChange(e) {
        this.updateField('subject', e)
        this.useRuler(e)
    }

    handleEmailChange(e) {
        this.updateField('emailAddress', e)
        this.useRuler(e)
    }

    handlePhoneChange(e) {
        this.updateField('phoneNumber', e)
        this.useRuler(e)
    }

    handleSubmit(e) {
        e.preventDefault()
        //const formData = JSON.stringify(this.state)
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
        let phoneNumber = this.state.phoneNumber.value
        if (this.state.phoneNumber.value.length > 0) {
            const value = this.state.phoneNumber.value
            let phoneNormalize = value.replace(/[^\d]/g, "")
            const size = phoneNormalize.length
            const zip = phoneNormalize.slice(0, 3)
            const prefix = phoneNormalize.slice(3, 6)
            const suffix = phoneNormalize.slice(6, 10)
            if (size > 0 && size <= 3) {
                console.log(size)
                phoneNormalize = "(" + zip + ")"
            } else if (size <= 6) {
                phoneNormalize = "(" + zip + ")" + prefix + "-"
            } else if (size <= 10){
                phoneNormalize = "(" + zip + ")" + prefix + "-" + suffix
            }
            phoneNumber = phoneNormalize
        } else {
            phoneNumber = this.state.phoneNumber.value
        }
        //const disabled = false
        const disabled = (this.state.firstName.isValid && this.state.lastName.isValid && this.state.emailAddress.isValid && this.state.phoneNumber.isValid) ? false : true
        return (
            <article className="screen-contact" ref={(contact) => { this.screenRef = contact }} onWheel={this.onWheel} onTouchMove={this.onTouchMove}>
                <form id='contact' className='form-contact' onSubmit={this.handleSubmit} noValidate >
                    <h2 className="screen-title">dear jacobsfletch,</h2>
                    <br/><br/>
                    <p>hello, my name is&nbsp;</p>
                    <span className='input input-text'>
                        <input placeholder="first" name='first' type='text' ref={(firstName) => { this.firstNameRef = firstName }} value={this.state.firstName.value}  onChange={this.handleFirstNameChange} />
                        <p className="error-message">{this.state.firstName.errorMessage}</p>
                        <p className="input-ruler" />
                    </span>
                    <p> </p>
                    <span className='input input-text'>
                        <input placeholder="last" name='last' type='text' ref={(lastName) => { this.lastNameRef = lastName }} value={this.state.lastName.value} onChange={this.handleLastNameChange} />
                        <p className="error-message">{this.state.lastName.errorMessage}</p>
                        <p className="input-ruler" />
                    </span>
                    <p>&nbsp;.&nbsp;i am reaching out to you because i would like to&nbsp;</p>
                    <span className="input input-select">
                        <select onChange={this.handleSubjectChange} ref={(subject) => { this.subjectRef = subject }} >
                            <option value="just say hi" defaultValue >just say hi</option>
                            <option value="hire you">hire you</option>
                            <option value="meet up">meet up</option>
                            <option value="spam your inbox">spam your inbox</option>
                        </select>
                        <p className="error-message">{this.state.subject.errorMessage}</p>
                        <p className="input-ruler" />
                    </span>
                    <br/><br/>
                    <p>my email address is&nbsp;</p>
                    <span className="input input-text">
                        <input placeholder="email" name='email' type='email' ref={(email) => { this.emailRef = email }} value={this.state.emailAddress.value} onChange={this.handleEmailChange} />
                        <p className="error-message">{this.state.emailAddress.errorMessage}</p>
                        <p className="input-ruler" />
                    </span>
                    <p>&nbsp;- or you can reach me at&nbsp;</p>
                    <span className="input input-text">
                        <input placeholder="(555)555-5555" name='email' type='tel' maxLength="13" ref={(phone) => { this.phoneRef = phone }} value={phoneNumber} onChange={this.handlePhoneChange} />
                        <p className="error-message">{this.state.phoneNumber.errorMessage}</p>
                        <p className="input-ruler" />
                    </span>
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
