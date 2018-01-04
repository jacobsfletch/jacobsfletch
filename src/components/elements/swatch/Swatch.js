import React from 'react';
import { connect } from 'react-redux'
import { activateDock, deactivateDock } from '../../../actions/DockActions'

import './swatch.css';

class Swatch extends React.Component {
	toggleDock(color) {
		if (this.props.dock.color !== color) {
			this.props.activateDock(color)
		} else {
			this.props.deactivateDock()
		}
	}
	render() {
		return (
			<button className={"swatch-" + this.props.color} onClick={() => { this.toggleDock(this.props.color) }}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Swatch)
