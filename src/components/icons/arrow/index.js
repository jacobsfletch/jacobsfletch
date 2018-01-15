import React from 'react'
import { Link } from 'react-router-dom'

import './index.css'

export default class ArrowIcon extends React.Component {
	render() {
		return (
			<svg className="icon-arrow" x="0px" y="0px" viewBox="0 0 48 24">
				<line className="arrow-stem" x1="2" y1="12" x2="46" y2="12"/>
				<polyline className="arrow-head" points="36,2 46,12 36,22 "/>
			</svg>
		)
	}
}
