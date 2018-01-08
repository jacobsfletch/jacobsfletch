import React from 'react'

import Clapper from '../../modules/clapper/'
import Subscribe from '../../forms/subscribe/'
import Social from '../../menus/social/'

import './index.css'

export default class ScreenFooter extends React.Component {
	render() {
		return (
			<footer className="screen-footer">
				<div className="footer-header" >
					<p>if you liked this project, clap once, twice, or thirty times.</p>
					<hr />
					<Clapper />
				</div>
				<div className="footer-body">
					<Subscribe name="subscribe" color="white" />
					<hr />
					<Social />
				</div>
			</footer>
		)
	}
}
