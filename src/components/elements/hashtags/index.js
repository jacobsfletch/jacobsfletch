import React, { Component } from 'react'

import './index.css'

class Hashtags extends Component {
	render() {
		const hashtag = this.props.data.map((item, i) => {
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
}

export default Hashtags
