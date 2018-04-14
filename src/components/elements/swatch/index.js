import React from 'react';
import { connect } from 'react-redux'

import { activateDock, deactivateDock } from '../../../SharedActions'

import './index.css';

const mapStateToProps = state => {
	return {
		dock: state.specs.dock
	}
}

const mapDispatchToProps = dispatch => {
	return {
		activateDock: (color) => { dispatch(activateDock(color)) },
		deactivateDock: () => { dispatch(deactivateDock()) }
	}
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Swatch)
