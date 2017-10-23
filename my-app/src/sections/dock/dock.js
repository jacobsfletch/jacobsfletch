import React from 'react';
import { Link } from 'react-router-dom';

import './dock.css';

export default class Dock extends React.Component {
    render() {
        const color = this.props.color
        const dock = this.props.dock
        const classes = dock ? `dock docked ${color}` : `dock`
        return (
            <div className={classes}>
                <nav className="dock-menu">
                    <ul>
                        <li>
                            Hello, my name is
                            <Link to="/">jacob fletcher</Link>
                        </li>
                        <li>
                            i am a
                            <Link to="/portfolio">creator of things</Link>
                        </li>
                        <li>
                            i also
                            <Link to="/blog">like to write</Link>
                        </li>
                        <li>
                            i am currently
                            <Link to="/contact">available for work</Link>
                        </li>
                        <li>
                            feel free to
                            <Link to="/contact">drop a line</Link>
                        </li>
                        <li>
                            oh, and i
                            <Link to="/contact">sell stuff too</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
