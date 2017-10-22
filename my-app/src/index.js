import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

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
            <div className={classes}>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/contact" component={Contact}></Route>
                <nav className="menu">
                    <button>
                        Hello, my name is
                        <Link to="/">jacob fletcher</Link>
                    </button>
                    <button>
                        i am a
                        <Link to="/portfolio">creator of things</Link>
                    </button>
                    <button>
                        i also
                        <Link to="/blog">like to write</Link>
                    </button>
                    <button>
                        i am currently
                        <Link to="/contact">available for work</Link>
                    </button>
                    <button>
                        feel free to
                        <Link to="/contact">drop a line</Link>
                    </button>
                    <button>
                        oh, and i
                        <Link to="/contact">sell stuff too</Link>
                    </button>
                </nav>
            </div>
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
            <div className="app-body"></div>
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

class Home extends React.Component {
    render() {
        return (
            <p>Home Page</p>
        )
    }
}

class Contact extends React.Component {
    render() {
        return (
            <p>Contact Page</p>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('app')
);
