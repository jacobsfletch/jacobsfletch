import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

import './index.css';

const mapStateToProps = state => {
	return {
		color: state.specs.dock.color,
		status: state.specs.dock.status
	}
}

const Dock = (props) => {
	const classes = props.status ? `dock docked ${props.color}` : `dock`
	return (
		<section className={classes}>
			<nav className="dock-menu">
				<ul>
					<li className="menu-item">
						<NavLink to="/portfolio">look at stuff</NavLink>
					</li>
					<li className="menu-item">
						<NavLink to="/blog">read stuff</NavLink>
					</li>
					<li className="menu-item">
						<NavLink to="/shop">buy stuff</NavLink>
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

export default connect(mapStateToProps)(Dock)
