import React from 'react';

import './swatch.css';

export default class Swatch extends React.Component {
    handleInitialClick() {
        this.props.activateDock(this.props.color)
    }
    render() {
        return (
            <button className={"swatch-" + this.props.color} onClick={this.handleInitialClick.bind(this)}/>
        )
    }
}
