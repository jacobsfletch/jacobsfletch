import React from 'react';

import './timer.css';

export default class ProjectThumbnail extends React.Component {
	constructor(props) {
		super()
		this.tick = this.tick.bind(this)
		this.state = {
			intervalId: '',
			time: new Date().toLocaleTimeString()
		}
	}
	tick() {
		const time = new Date().toLocaleTimeString()
		this.setState({
			time: time
		})
	}
	componentDidMount() {
		this.intervalId = setInterval(this.tick, 1000)
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}
	render() {
		return (
			<div className="module-timer">
				<time className="timer-time">
					{this.state.time}
				</time>
			</div>
		)
	}
}
