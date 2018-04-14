import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocumentMeta from 'react-document-meta';

import { updateId } from '../../SharedActions'

const screenComponent = (PassedComponent) => {

	const mapStateToProps = state => {
		return {
			blog: state.data.blog,
			route: state.specs.route
		}
	}

	const mapDispatchToProps = dispatch => {
		return {
			userScrolled: (ratio) => { dispatch({ type: 'USER_SCROLLED', payload: ratio }) },
			updateId: (id) => { dispatch(updateId(id)) }
		}
	}

	class ScreenComponent extends Component {

		constructor() {
			super()
			this.screenRef = null
			this.onWheel = this.onWheel.bind(this)
			this.onTouchStart = this.onTouchStart.bind(this)
			this.onTouchMove = this.onTouchStart.bind(this)
			this.offsetHeight = 0
			this.scrollHeight = 0
			this.nextScrollY = 0
			this.lastScrollY = 0
			this.scrollTop = 0
			this.nextScroll = 0
			this.ratioScrolled = 0
			this.data = []
		}

		componentWillReceiveProps(nextProps) {
		}

		componentDidMount() {
			this.screenRef = this.child.screenRef
			this.screenRef.addEventListener('wheel', this.onWheel.bind(this))
			this.screenRef.addEventListener('touchstart', this.onTouchStart)
			this.screenRef.addEventListener('touchmove', this.onTouchMove)
		}

		componentWillUnmount() {
			this.screenRef.removeEventListener('wheel', this.onWheel)
			this.screenRef.removeEventListener('touchstart', this.onTouchStart)
			this.screenRef.removeEventListener('touchmove', this.onTouchMove)
		}

		setSizes() {
			this.offsetHeight = this.screenRef.offsetHeight
			this.scrollHeight = this.screenRef.scrollHeight
			this.scrollTop = this.screenRef.scrollTop
			this.ratioScrolled = (this.offsetHeight + this.scrollTop) / this.scrollHeight
		}

		onWheel(e) {
			this.setSizes()
			this.nextScrollY = e.deltaY
			this.nextScroll = this.scrollTop + this.nextScrollY

			this.screenRef.scrollTop = this.nextScroll
			this.props.userScrolled(this.ratioScrolled)
		}

		onTouchStart(e) {
			e.stopPropagation()
			this.thisScroll = e.touches[0].pageY
			this.lastScrollY = this.thisScroll
		}

		onTouchMove(e) {
			this.setSizes()
			this.thisScroll = e.touches[0].pageY
			this.nextScroll = this.lastScrollY - this.thisScroll

			const fullyUp = this.scrollTop + this.nextScroll < 0
			const fullyDown = this.offsetHeight + this.scrollTop + this.nextScroll > this.scrollHeight
			const isBeyondContainer = fullyUp || fullyDown

			// if (fullyUp) { console.log('fully up') }
			// else if (fullyDown) { console.log('fully down') }

			if (!isBeyondContainer) {
				e.stopPropagation()
			}

			this.lastScrollY = this.thisScroll
			this.props.userScrolled(this.ratioScrolled)
		}

		checkIfFullyScrolled() {
			//const scrollLeft = this.screenRef.scrollLeft
			//const scrollWidth = this.state.scrollWidth
			//const portfolioWidth = this.state.portfolioWidth
			///const portfolioHeight = this.state.portfolioHeight

			//let check = false
			//if (this.isTouchDevice) {
			//	check = this.scrollTop <= 0 || this.scrollHeight - this.scrollTop <= -portfolioHeight
			//} else {
			//	check = scrollLeft <= 0 || scrollWidth - scrollLeft <= -portfolioHeight + 1
			//}
			//
			//this.setState({
			//	move: this.state.move + 1,
			//	isFullyScrolled: check
			//})
		}

		render() {

			let meta = {}
			meta.title = 'some title'
			meta.meta = {
				name: {
					keywords: 'some keywords',
					description: 'some description'
				}
			}

			return (
				<React.Fragment>
					<DocumentMeta {...meta} />
					<PassedComponent
						ref={(node) => { this.child = node }}
						data={{...this.props}}
					/>
				</React.Fragment>
			)
		}
	}

	return connect(mapStateToProps, mapDispatchToProps)(ScreenComponent);

}

export default screenComponent
