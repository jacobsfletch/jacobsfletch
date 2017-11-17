import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { deactivateDock } from '../../../actions/DockActions'

import './dock.css';

class Dock extends React.Component {
    render() {
        const classes = this.props.status ? `dock docked ${this.props.color}` : `dock`
        return (
            <div className={classes}>
                <nav className="dock-menu">
                    <ul>
                        <li className="menu-item">
                            Hello, my name is&nbsp;
                            <NavLink to="/" onClick={(e) => this.props.deactivateDock()}>jacob fletcher</NavLink>
                        </li>
                        <li className="menu-item">
                            i am a&nbsp;
                            <NavLink to="/portfolio" onClick={(e) => this.props.deactivateDock()}>creator of things</NavLink>
                        </li>
                        <li className="menu-item">
                            no route &nbsp;
                            <NavLink to="/noroute" onClick={(e) => this.props.deactivateDock()}>here</NavLink>
                        </li>
                        <li className="menu-item">
                            i also&nbsp;
                            <NavLink to="/blog" onClick={(e) => this.props.deactivateDock()}>like to write</NavLink>
                        </li>
                        <li className="menu-item">
                            i am currently&nbsp;
                            <NavLink to="/contact" onClick={(e) => this.props.deactivateDock()}>available for work</NavLink>
                        </li>
                        <li className="menu-item">
                            feel free to&nbsp;
                            <NavLink to="/contact" onClick={(e) => this.props.deactivateDock()}>drop a line</NavLink>
                        </li>
                        <li className="menu-item">
                            oh, and i&nbsp;
                            <NavLink to="/contact" onClick={(e) => this.props.deactivateDock()}>sell stuff too</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        color: state.dock.color,
        status: state.dock.status
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deactivateDock: () => {
            dispatch(deactivateDock())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dock)
