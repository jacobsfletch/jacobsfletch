import React from 'react';
import { connect } from 'react-redux'

import Swatch from '../../elements/swatch'
import Progress from '../../modules/progress'

import { activateDock, deactivateDock } from '../../../SharedActions'

import './index.css';

const Header = (props) => {
	const menu = props.dock.status ? 'close' : 'menu'
	return (
		<header className="app-header">
			<div className="cropmark tl"></div>
			<div className="swatches">
				<Swatch color="cyan"/>
				<Swatch color="magenta"/>
				<Swatch color="yellow"/>
				<Swatch color="black"/>
			</div>
			<div className="header-menu">
				<button onClick={() => {
					if (props.dock.status) {
						props.deactivateDock()
					} else {
						props.activateDock("black")
					}
				}}>
					{menu}
				</button>
			</div>
			<div className="cropmark tr"></div>
			<div className="header-after">
				<Progress />
			</div>
		</header>
	)
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
