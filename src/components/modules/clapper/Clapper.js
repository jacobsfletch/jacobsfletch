import React from 'react';

import './clapper.css';

export default class Clapper extends React.Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			claps: 0,
			id: ''
		}
	}

	componentDidMount() {
		this.setState({
			claps: this.props.claps,
			id: this.props.id
		})
	}

	handleSubmit(e, id) {
		console.log(id)
		const newClapCount = this.state.claps + 1
		const data = { newClapCount, id }
		this.setState({claps: newClapCount})
		return
		fetch('/api/project/clap', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {'Content-Type':'application/json'}
			})
		return false
	}

	render() {
		const id = this.props.id ? this.props.id : null
		return (
			<button className="button-clapper" onClick={(e) => this.handleSubmit(e, id)} >
				<svg className="button-icon" width="32" height="32" viewBox="0 0 32 32">
					<path className="hand-back" d="M24,20.6c0.2,1.3,0.4,4.7-3,8.1c-4.3,4.3-9.8,1.3-12.3-1.3s-6.8-6.8-6.8-6.8c-0.7-0.7-0.7-1.8,0-2.6l0,0
						c0.7-0.7,1.8-0.7,2.6,0l4.3,4.3l-6-6c-0.7-0.7-0.7-1.8,0-2.6l0,0c0.7-0.7,1.8-0.7,2.6,0l5.1,5.1l-6.8-6.8c-0.7-0.7-0.7-1.8,0-2.6
						l0,0c0.7-0.7,1.8-0.7,2.6,0l6.8,6.8l-5.1-5.1c-0.7-0.7-0.7-1.8,0-2.6l0,0C8.5,8,9.7,8,10.4,8.7l7.3,7.3L16,12.7
						c-0.4-0.9-0.1-2,0.8-2.4l0,0c0.9-0.4,2-0.1,2.4,0.8C19.3,11.1,23.6,17.6,24,20.6z"/>
					<path className="hand-front" d="M24,20.6c0.2,1.3,0.4,4.7-3,8.1c-4.3,4.3-9.8,1.3-12.3-1.3s-6.8-6.8-6.8-6.8c-0.7-0.7-0.7-1.8,0-2.6l0,0
						c0.7-0.7,1.8-0.7,2.6,0l4.3,4.3l-6-6c-0.7-0.7-0.7-1.8,0-2.6l0,0c0.7-0.7,1.8-0.7,2.6,0l5.1,5.1l-6.8-6.8c-0.7-0.7-0.7-1.8,0-2.6
						l0,0c0.7-0.7,1.8-0.7,2.6,0l6.8,6.8l-5.1-5.1c-0.7-0.7-0.7-1.8,0-2.6l0,0C8.5,8,9.7,8,10.4,8.7l7.3,7.3L16,12.7
						c-0.4-0.9-0.1-2,0.8-2.4l0,0c0.9-0.4,2-0.1,2.4,0.8C19.3,11.1,23.6,17.6,24,20.6z"/>
					<line x1="23.5" y1="3.6" x2="25.2" y2="1.9"/>
					<line x1="27.6" y1="5" x2="29.3" y2="3.3"/>
					<line x1="28.4" y1="9.3" x2="30.1" y2="7.6"/>
				</svg>
				<p className="button-count">{this.state.claps}</p>
			</button>
		)
	}
}
