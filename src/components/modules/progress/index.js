import React from 'react';

import './index.css';

const Progress = (props) => {
	return (
		<div className="scroll-progress">
			<div className="measure-index-b" />
			<div className="measure-index" />
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

export default Progress
