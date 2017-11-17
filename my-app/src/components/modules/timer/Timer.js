import React from 'react';

import './timer.css';

export default class ProjectThumbnail extends React.Component {
    constructor(props) {
        super()
        this.state = {
            time: new Date().toLocaleString()
        }
    }
    tick() {
        const newDate = new Date()
        this.setState({
            time: newDate.toLocaleTimeString(),
            date: newDate.toLocaleDateString().replace(/\//g, '')
        });
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
            <div className="module-timer">
                <time className="timer-date">
                    {this.state.date}
                </time>
                <time className="timer-time">
                    {this.state.time}
                </time>
            </div>
        )
    }
}
