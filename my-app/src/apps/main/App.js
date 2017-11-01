import React from 'react';

import Dock from '../../layouts/dock/dock';
import Header from '../../layouts/header/header';
import Footer from '../../layouts/footer/footer';
import ScreenController from '../../screens/ScreenController';

import { activateDock } from './AppActions'

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
                <ScreenController className="screen" />
                <Footer />
            </div>
        )
    }
}
