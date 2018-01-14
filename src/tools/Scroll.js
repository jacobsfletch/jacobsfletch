export function OnWheel(e) {
	const scrollY = e.deltaY
	const scrollTop = this.screenRef.scrollTop
	const nextScroll = scrollTop + scrollY
	this.screenRef.scrollTop = nextScroll
}

export function OnTouchMove(e) {
	const scrollTop = this.screenRef.scrollTop
	const thisScroll = e.touches[0].pageY
	const nextScroll = this.state.lastScrollY - thisScroll
	const fullyUp = scrollTop + nextScroll < 0
	const fullyDown = this.screenRef.scrollHeight - nextScroll <= this.screenRef.offsetHeight
	const isBeyondContainer = fullyUp || fullyDown

	console.log(scrollTop + nextScroll)

	if (fullyUp) {
		console.log('fully up')
	}

	if (fullyDown) {
		console.log('fully down')
	}

	if (!isBeyondContainer) {
		e.stopPropagation()
	}

	this.setState({lastScrollY: thisScroll})
}
