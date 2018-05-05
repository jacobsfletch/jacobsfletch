import React from 'react';
import { connect } from 'react-redux'

import './index.css';

const mapStateToProps = state => {
	return {
		scrollRatio: state.specs.screenSpecs.scrollRatio
	}
}

const Progress = (props) => {
	return (
		<div className="scroll-progress">
			<span>{`${(props.scrollRatio || 0) * 100}%`}</span>
		</div>
	)
}

export default connect(mapStateToProps)(Progress)
