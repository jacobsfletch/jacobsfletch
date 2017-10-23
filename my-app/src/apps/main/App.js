import React from 'react';

import Dock from '../../sections/dock/dock';
import Header from '../../sections/header/header';
import Footer from '../../sections/footer/footer';
import Screen from '../../screens/screen';

import '../../reset.css';
import './main.css';

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            color: '',
            docked: false,
            screen: ''
        }
    }
    activateDock(color) {
        const prevColor = this.state.color
        if (prevColor === color) {
            this.setState({color: '', docked: false})
        } else {
            this.setState({color, docked: true})
        }
    }
    render() {
        const color = this.state.color
        const dock = this.state.docked
        return (
            <div className="app">
                <Dock dock={dock} color={color} />
                <Header activateDock={this.activateDock.bind(this)} />
                <Screen className="screen" />
                <Footer />
            </div>
        )
    }
}
