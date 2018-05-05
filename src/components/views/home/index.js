import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './index.css'

class HomeView extends Component {
	render() {
		return (
			<section className="screen-home">
				<article className="screen-body">
					<h1 className="screen-title">
						hello, my name is jacob fletcher and this is my website.
						<br /><br />
						it is a place to <Link to={"/Portfolio"}>see</Link> my work,
						a place to <Link to={"/blog"}>read</Link> my thoughts,
						and somewhere to <Link to={"/shop"}>buy</Link> my stuff.
						Feel free to <Link to={"/contact"}>write</Link> me a letter
						- or even <Link to={"/doodle"}>draw</Link> me a picture.
					</h1>
				</article>
			</section>
		)
	}
}

export default HomeView
