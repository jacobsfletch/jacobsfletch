import React, { Component } from 'react'

function screenComponent(wrappedComponent) {

	return class extends Component {

		constructor() {
			super()
			this.offsetHeight = 0
			this.scrollHeight = 0
			this.scrollY = 0
			this.scrollTop = 0
			this.nextScroll = 0
			this.ratioScrolled = 0
			this.lastScrollY = 0
		}

		setSizes() {
			this.offsetHeight = this.screenRef.offsetHeight
			this.scrollHeight = this.screenRef.scrollHeight
			this.scrollTop = this.screenRef.scrollTop
			this.ratioScrolled = (this.offsetHeight + this.scrollTop) / this.scrollHeight
		}

		onWheel(e) {
			this.setSizes()
			this.scrollY = e.deltaY
			this.nextScroll = this.scrollTop + scrollY

			this.screenRef.scrollTop = this.nextScroll
			this.props.userScrolled(ratioScrolled)
		}

		onTouchStart(e) {
			e.stopPropagation()
			this.thisScroll = e.touches[0].pageY
			this.lastScrollY = this.thisScroll
		}

		onTouchMove(e) {
			this.setSizes()
			this.thisScroll = e.touches[0].pageY
			this.nextScroll = this.state.lastScrollY - thisScroll
			const fullyUp = scrollTop + nextScroll < 0
			const fullyDown = offsetHeight + scrollTop + nextScroll > scrollHeight
			const isBeyondContainer = fullyUp || fullyDown
			const ratioScrolled = ((offsetHeight + scrollTop) / scrollHeight) / offsetHeight

			// if (fullyUp) { console.log('fully up') }
			// else if (fullyDown) { console.log('fully down') }

			if (!isBeyondContainer) {
				e.stopPropagation()
			}

			this.lastScrollY = thisScroll
			this.props.userScrolled(ratioScrolled)}

		//////////////////////////////////////////////////////
		//////////////////////////////////////////////////////
		//////////////////////////////////////////////////////

		checkIfFullyScrolled() {
			const scrollLeft = this.screenRef.scrollLeft
			const scrollWidth = this.state.scrollWidth
			const portfolioWidth = this.state.portfolioWidth
			const portfolioHeight = this.state.portfolioHeight

			let check = false
			if (this.isTouchDevice) {
				check = this.scrollTop <= 0 || this.scrollHeight - this.scrollTop <= -portfolioHeight
			} else {
				check = scrollLeft <= 0 || scrollWidth - scrollLeft <= -portfolioHeight + 1
			}

			this.setState({
				move: this.state.move + 1,
				isFullyScrolled: check
			})
		}

		//////////////////////////////////////////////////////
		//////////////////////////////////////////////////////
		//////////////////////////////////////////////////////

		setScrollContainerSize() {
			this.setState ({
				portfolioHeight: this.screenRef.offsetHeight,
				portfolioWidth: this.screenRef.offsetWidth,
				portfolioOffsetLeft: this.screenRef.getBoundingClientRect().x,
				portfolioOffsetTop: this.screenRef.getBoundingClientRect().y,
				scrollHeight: this.screenRef.scrollHeight,
				scrollWidth: this.screenRef.scrollWidth
			})
			const portfolioSize = {
				height: this.screenRef.offsetHeight,
				width: this.screenRef.offsetWidth
			}
			this.resizePortfolio(portfolioSize)
			this.checkIfFullyScrolled()
		}

		//////////////////////////////////////////////////////
		//////////////////////////////////////////////////////
		//////////////////////////////////////////////////////

		render() {
			<wrappedComponent />
		}
	}
}
