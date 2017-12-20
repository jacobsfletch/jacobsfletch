import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

import './dock.css';

class Dock extends React.Component {
    render() {
        const classes = this.props.status ? `dock docked ${this.props.color}` : `dock`
        return (
            <section className={classes}>
                <nav className="dock-menu">
                    <ul>
                        <li className="menu-item">
                            Hello, my name is&nbsp;
                            <NavLink to="/">jacob fletcher</NavLink>
                        </li>
                        <li className="menu-item">
                            i am a&nbsp;
                            <NavLink to="/portfolio">creator of things</NavLink>
                        </li>
                        <li className="menu-item">
                            i also&nbsp;
                            <NavLink to="/blog">like to write</NavLink>
                        </li>
                        <li className="menu-item">
                            i am currently&nbsp;
                            <NavLink to="/contact">available for work</NavLink>
                        </li>
                        <li className="menu-item">
                            feel free to&nbsp;
                            <NavLink to="/contact">drop a line</NavLink>
                        </li>
                        <li className="menu-item">
                            oh, and i&nbsp;
                            <NavLink to="/contact">sell stuff too</NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        color: state.dock.color,
        status: state.dock.status
    }
}

export default connect(mapStateToProps)(Dock)
