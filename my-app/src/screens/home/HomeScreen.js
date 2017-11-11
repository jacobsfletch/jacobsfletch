import React from 'react';

import './HomeScreen.css';

export default class HomeScreen extends React.Component {
    componentDidMount() {
        this.props.changeScreenTitle
    }
    render() {
        return (
            <h1>'Home Boi'</h1>
        )
    }
}
