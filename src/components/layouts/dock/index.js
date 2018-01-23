import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

import './index.css';

const Dock = (props) => {
	const classes = this.props.status ? `dock docked ${this.props.color}` : `dock`
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

function mapStateToProps(state) {
	return {
		color: state.dock.color,
		status: state.dock.status
	}
}

export default connect(mapStateToProps)(Dock)
