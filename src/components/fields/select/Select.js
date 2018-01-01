import React from 'react';

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
        this.useRuler(this.subjectRef)
    }

    useRuler(e) {
        let element = e.target ? e.target : e
        const ruler = element.parentNode.lastChild
        ruler.innerHTML = element.value ? element.value : element.placeholder
        const rulerWidth = ruler.offsetWidth
        element.style.width = rulerWidth + 8 + 'px'
    }

    handleChange(e) {
        const value = e.target.value
        this.setState({
            value
        })
        this.useRuler(e)
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
