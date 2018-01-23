import React from 'react'

import './index.css'

const Hashtags  = (props) => {
	const hashtag = props.data.map((item, i) => {
		return (
			<li key={i} className="list-item">
				{item.name}
			</li>
		)
	})
	return (
		<section className="screen-hashtags">
			<h3 className="list-title">hashtags</h3>
			{hashtag}
		</section>
	)
}

export default Hashtags
