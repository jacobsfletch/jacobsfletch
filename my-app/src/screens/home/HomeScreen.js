import React from 'react';

import './HomeScreen.css';

export default class HomeScreen extends React.Component {
    componentDidMount() {
        const screenName = "index"
        this.props.changeScreenTitle(screenName)
    }
    render() {
        return (
            <h1>'Home Boi'</h1>
        )
    }
}
