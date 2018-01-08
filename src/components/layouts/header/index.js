import React from 'react';

import Swatch from '../../elements/swatch/'
import Progress from '../../modules/progress/'

import { connect } from 'react-redux'
import { activateDock, deactivateDock } from '../../../actions/DockActions'

import './index.css';

class Header extends React.Component {
	toggleDock(color) {
		if (this.props.dock.status) {
			this.props.deactivateDock()
		} else {
			this.props.activateDock(color)
		}
	}
	render() {
		const menu = this.props.dock.status ? 'close' : 'menu'
		return (
			<header className="app-header">
				<div className="cropmark tl"></div>
				<div className="swatches">
					<Swatch color="cyan"/>
					<Swatch color="magenta"/>
					<Swatch color="yellow"/>
					<Swatch color="black"/>
				</div>
				<div className="header-menu" onClick={() => { this.toggleDock("black") }}>
					<p>{menu}</p>
				</div>
				<div className="cropmark tr"></div>
				<div className="header-after">
					<Progress />
				</div>
			</header>
		)
	}
}

function mapStateToProps(state) {
	return {
		dock: state.dock
	}
}

function mapDispatchToProps(dispatch) {
	return {
		activateDock: (color) => {
			dispatch(activateDock(color))
		},
		deactivateDock: () => {
			dispatch(deactivateDock())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
