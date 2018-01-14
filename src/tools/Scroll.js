export function OnWheel(e) {
	const scrollY = e.deltaY
	const scrollTop = this.screenRef.scrollTop
	const nextScroll = scrollTop + scrollY
	this.screenRef.scrollTop = nextScroll
}

export function OnTouchStart(e) {
	e.stopPropagation()
	const thisScroll = e.touches[0].pageY
	this.setState({ lastScrollY: thisScroll })
}

export function OnTouchMove(e) {
	const offsetHeight = this.screenRef.offsetHeight
	const scrollHeight = this.screenRef.scrollHeight
	const scrollTop = this.screenRef.scrollTop
	const thisScroll = e.touches[0].pageY
	const nextScroll = this.state.lastScrollY - thisScroll
	const fullyUp = scrollTop + nextScroll < 0
	const fullyDown = offsetHeight + scrollTop + nextScroll > scrollHeight
	const isBeyondContainer = fullyUp || fullyDown

	// console.log(`offsetHeight: ${offsetHeight} / scrollHeight: ${scrollHeight}`)
	// console.log(`scrollTop: ${scrollTop} / nextScroll: ${nextScroll}`)

	// if (fullyUp) { console.log('fully up') }
	// else if (fullyDown) { console.log('fully down') }

	if (!isBeyondContainer) {
		e.stopPropagation()
	}

	this.setState({lastScrollY: thisScroll})
}
