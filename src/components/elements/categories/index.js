import React from 'react'

import './index.css'

const Categories = (props) => {
	const category = props.data.map((item, i) => {
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

export default Categories
