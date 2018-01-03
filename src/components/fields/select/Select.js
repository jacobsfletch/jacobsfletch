import React from 'react';
import Ruler from '../../tools/Ruler'

import './select.css';

export default class Select extends React.Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            subject: {
                value: '',
                isValid: false,
                errorMessage: ''
            }
        }
    }

    componentDidMount() {
        Ruler(this.subjectRef)
    }

    handleChange(e) {
        const value = e.target.value
        this.setState({
            value
        })
        Ruler(e)
    }

    render() {
        const options = this.props.options.map(function(option) {
            return (
                <option key={option} value={option} >
                    {option}
                </option>
            )
        })
        return (
            <span className="input input-select">
                <select ref={(subject) => { this.subjectRef = subject }} onChange={this.handleChange}>
                    {options}
                </select>
                <p className="input-ruler" />
            </span>
        )
    }
}
