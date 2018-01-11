import React from 'react'

import Subscribe from '../../forms/subscribe/'

import './index.css'

export default class ScreenFooter extends React.Component {
	render() {
		return (
			<footer className="screen-footer">
				<Subscribe name="subscribe" />
			</footer>
		)
	}
}
