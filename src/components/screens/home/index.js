import React from 'react'
import { Link } from 'react-router-dom'

import './index.css'

export default class HomeScreen extends React.Component {

	constructor(props) {
		super(props)
		this.onTouchMove = this.onTouchMove.bind(this)
		this.onTouchStart = this.onTouchStart.bind(this)
		this.onWheel = this.onWheel.bind(this)
		this.state = {
			lastScrollY: 0
		}
	}

	onWheel(e) {
		const scrollY = e.deltaY
		const scrollTop = this.screenRef.scrollTop
		const nextScroll = scrollTop + scrollY
		this.screenRef.scrollTop = nextScroll
	}

	onTouchStart(e) {
		this.setState({
			lastScrollY: e.touches[0].pageY
		})
	}

	onTouchMove(e) {
		const scrollTop = this.screenRef.scrollTop
		const thisScroll = this.state.lastScrollY - e.touches[0].pageY
		const isBeyondContainer = scrollTop + thisScroll < 0
		console.log(isBeyondContainer)
		if (!isBeyondContainer) {
			e.stopPropagation()
		}
		this.setState({
			lastScrollY: e.touches[0].pageY
		})
	}

	render() {
		return (
			<section className="screen-home"
				ref={(home) => { this.screenRef = home }}
				onWheel={this.onWheel}
				onTouchStart={this.onTouchStart}
				onTouchMove={this.onTouchMove}>

				<article className="screen-body">
					<h1 className="screen-title">
						hello, my name is jacob fletcher.
						<br /><br />
						i am a designer and web developer.
						this is my website.
						it is a place to <Link to={"/Portfolio"}>see</Link> my work,
						a place to <Link to={"/blog"}>read</Link> my thoughts,
						and somewhere to <Link to={"/"}>buy</Link> my stuff.
						<br /><br />
						Feel free to <Link to={"/contact"}>write</Link> me a letter, by all means
						- or even <Link to={"/doodle"}>draw</Link> me a picture.
					</h1>
				</article>
			</section>
		)
	}
}
