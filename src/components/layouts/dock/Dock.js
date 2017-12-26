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
                            <NavLink to="/portfolio">look at stuff</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/">read stuff</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/">buy stuff</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/doodle">draw things</NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="/contact">say things</NavLink>
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
