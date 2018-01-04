import React from 'react'
import Timer from '../../modules/timer/Timer'
import Breadcrumbs from '../../modules/breadcrumbs/Breadcrumbs'

import './footer.css'

class Footer extends React.Component {
	render() {
		return (
			<footer className="app-footer">
				<div className="cropmark bl"></div>
				<nav className="footer-breadcrumbs">
					<Breadcrumbs />
				</nav>
				<div className="footer-title">
					<Timer />
				</div>
				<div className="footer-subtitle">
					<p>Top</p>
				</div>
				<div className="cropmark br"></div>
			</footer>
		)
	}
}

export default Footer
