import React, { Component } from 'react'

import './index.css'

class Categories extends Component {
	render() {
		const category = this.props.data.map((item, i) => {
			return (
				<li key={i} className="list-item">
					{item.name}
				</li>
			)
		})
		return (
			<ul className="screen-categories">
				{category}
			</ul>
		)
	}
}

export default Categories
