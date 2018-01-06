import React from 'react'

import Clapper from '../../modules/clapper/Clapper'
import Subscribe from '../../forms/subscribe/Subscribe'
import Social from '../../menus/social/Social'

import './screen-footer.css'

export default class ScreenFooter extends React.Component {
	render() {
		return (
			<footer className="screen-footer">
				<div className="footer-header" >
					<p>if you liked this project, clap once, twice, or thirty times.</p>
					<Clapper />
				</div>
				<div className="footer-body">
					<Subscribe name="subscribe" />
					<hr />
					<Social />
				</div>
			</footer>
		)
	}
}
