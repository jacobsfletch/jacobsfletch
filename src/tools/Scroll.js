//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export function OnWheel(e) {
	const offsetHeight = this.screenRef.offsetHeight
	const scrollHeight = this.screenRef.scrollHeight
	const scrollY = e.deltaY
	const scrollTop = this.screenRef.scrollTop
	const nextScroll = scrollTop + scrollY
	const ratioScrolled = (offsetHeight + scrollTop) / scrollHeight
	this.screenRef.scrollTop = nextScroll

	this.props.userScrolled(ratioScrolled)
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export function OnTouchStart(e) {
	e.stopPropagation()
	const thisScroll = e.touches[0].pageY
	this.setState({ lastScrollY: thisScroll })
}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export function OnTouchMove(e) {
	const offsetHeight = this.screenRef.offsetHeight
	const scrollHeight = this.screenRef.scrollHeight
	const scrollTop = this.screenRef.scrollTop
	const thisScroll = e.touches[0].pageY
	const nextScroll = this.state.lastScrollY - thisScroll
	const fullyUp = scrollTop + nextScroll < 0
	const fullyDown = offsetHeight + scrollTop + nextScroll > scrollHeight
	const isBeyondContainer = fullyUp || fullyDown
	const ratioScrolled = ((offsetHeight + scrollTop) / scrollHeight) / offsetHeight

	// if (fullyUp) { console.log('fully up') }
	// else if (fullyDown) { console.log('fully down') }

	if (!isBeyondContainer) {
		e.stopPropagation()
	}

	this.setState({lastScrollY: thisScroll})
	this.props.userScrolled(ratioScrolled)}

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

export function CheckIfFullyScrolled() {
	const scrollTop = this.screenRef.scrollTop
	const scrollLeft = this.screenRef.scrollLeft
	const scrollWidth = this.state.scrollWidth
	const scrollHeight = this.state.scrollHeight
	const portfolioWidth = this.state.portfolioWidth
	const portfolioHeight = this.state.portfolioHeight

	let check = false
	if (this.isTouchDevice) {
		check = scrollTop <= 0 || scrollHeight - scrollTop <= -portfolioHeight
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

export function SetScrollContainerSize() {
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
