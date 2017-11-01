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
                        <li className="menu-item">
                            Hello, my name is&nbsp;
                            <Link to="/">jacob fletcher</Link>
                        </li>
                        <li className="menu-item">
                            i am a&nbsp;
                            <Link to="/portfolio">creator of things</Link>
                        </li>
                        <li className="menu-item">
                            i also&nbsp;
                            <Link to="/blog">like to write</Link>
                        </li>
                        <li className="menu-item">
                            i am currently&nbsp;
                            <Link to="/contact">available for work</Link>
                        </li>
                        <li className="menu-item">
                            feel free to&nbsp;
                            <Link to="/contact">drop a line</Link>
                        </li>
                        <li className="menu-item">
                            oh, and i&nbsp;
                            <Link to="/contact">sell stuff too</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
