import React from 'react';

import './contact.css';

export default class Contact extends React.Component {
    handleSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        console.log(e.target)
        fetch('/api/email/send', {
                method: 'POST',
                body: data
            })
            .then(response => {
                console.log(response)
            })
    }
    render() {
        return (
            <div>
                <p>start by filling out the form below so that i know how to best reach you.</p>
                <form id='contact' className='form-contact' onSubmit={(e) => this.handleSubmit.bind(this)}>
                    <input placeholder="first" className='input-text' name='first' type='text' required />
                    <input placeholder="last" className='input-text' name='last' type='text' required />
                    <input placeholder="email" className='input-text' name='email' type='email' required />
                    <button type="submit" className='btn-main'>Submit</button>
                </form>
            </div>
        )
    }
}
