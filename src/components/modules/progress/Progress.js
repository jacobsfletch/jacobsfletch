import React from 'react';

import './progress.css';

export default class Progress extends React.Component {
	render() {
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
}
