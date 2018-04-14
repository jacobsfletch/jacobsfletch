import React from 'react';
import { connect } from 'react-redux'

import './index.css';

const mapStateToProps = state => {
	return {
		ratioScrolled: state.specs.ratioScrolled
	}
}

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

export default connect(mapStateToProps)(Progress)
