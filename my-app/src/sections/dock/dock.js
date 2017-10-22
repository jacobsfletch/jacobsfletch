import React from 'react';
import { Route, Link } from 'react-router-dom';

import Contact from '../../screens/contact/contact';
import Home from '../../screens/home/home';

import './dock.css';

export default class Dock extends React.Component {
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
