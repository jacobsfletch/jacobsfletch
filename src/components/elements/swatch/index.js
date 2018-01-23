import React from 'react';
import { connect } from 'react-redux'

import { activateDock, deactivateDock } from '../../../SharedActions'

import './index.css';

const Swatch = (props) => {
	return (
		<button
			className={"swatch-" + props.color}
			onClick={() => {
				if (props.dock.color !== props.color) {
					props.activateDock(props.color)
				} else {
					props.deactivateDock()
				}
			}}
		/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Swatch)
