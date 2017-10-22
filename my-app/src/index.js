import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// var data = require('./data.js');

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            color: '',
            docked: false
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
    componentDidUpdate() {
        // console.log('didUpdate')
    }
    render() {
        const color = this.state.color
        const dock = this.state.docked
        return (
            <div className="app">
                <Dock dock={dock} color={color} />
                <Header activateDock={this.activateDock.bind(this)} />
                <Body />
                <Footer />
            </div>
        )
    }
}

class Dock extends React.Component {
    render() {
        const color = this.props.color
        const dock = this.props.dock
        const classes = dock ? `dock docked ${color}` : `dock`
        return (
            <div className={classes}></div>
        )
    }
}

class Header extends React.Component {
    activateDock(color) {
        this.props.activateDock(color)
    }
    render() {
        return (
            <div className="app-header">
                <div className="cropmark"></div>
                <h1 className="header-title">header-title</h1>
                <div className="swatches">
                    <Swatch color="cyan" activateDock={this.activateDock.bind(this)}/>
                    <Swatch color="magenta" activateDock={this.activateDock.bind(this)}/>
                    <Swatch color="yellow" activateDock={this.activateDock.bind(this)}/>
                    <Swatch color="black" activateDock={this.activateDock.bind(this)}/>
                </div>
                <div className="cropmark"></div>
            </div>
        )
    }
}

class Body extends React.Component {
    render() {
        return (
            <div className="app-body">
                <p>body</p>
            </div>
        )
    }
}

class Swatch extends React.Component {
    handleInitialClick() {
        this.props.activateDock(this.props.color)
    }
    render() {
        return (
            <button className={"swatch-" + this.props.color} onClick={this.handleInitialClick.bind(this)}/>
        )
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div className="app-footer">
                <div className="cropmark"></div>
                <h6 className="footer-title">footer-title</h6>
                <p className="footer-subtitle"> footer-subtitle</p>
                <div className="cropmark"></div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
