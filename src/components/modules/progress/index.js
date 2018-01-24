import React from 'react';
import { connect } from 'react-redux'

import './index.css';

const Progress = (props) => {
	const transform = props.ratioScrolled * 100 + "%"
	return (
		<div className="scroll-progress">
			<span className="measure-index" style={{top: transform}} />
			<div className="measure-inner">
				<span className="line" />
				<span className="line" />
				<span className="line" />
				<span className="line" />
				<span className="line" />
			</div>
		</div>
	)
}

function mapStateToProps(state) {
	return {
		ratioScrolled: state.ratioScrolled
	}
}

export default connect(mapStateToProps)(Progress)
