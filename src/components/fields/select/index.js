import React from 'react';
import Ruler from '../../tools/Ruler'

import './index.css';

export default class Select extends React.Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			subject: {
				value: '',
				isValid: true,
				errorMessage: ''
			}
		}
	}

	componentDidMount() {
		this.props.handleChange({subject: this.state.subject})
		Ruler(this.subjectRef)
	}

	handleChange(e) {
		const value = e.target.value
		this.setState({ value })
		this.props.handleChange({subject: this.state.subject})
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
				<select
					ref={(subject) => { this.subjectRef = subject }}
					onChange={this.handleChange}
				>
					{options}
				</select>
				<p className="input-ruler" />
			</span>
		)
	}
}
