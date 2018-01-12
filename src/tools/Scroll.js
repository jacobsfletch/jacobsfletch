export function OnWheel(e) {
	const scrollY = e.deltaY
	const scrollTop = this.screenRef.scrollTop
	const nextScroll = scrollTop + scrollY
	this.screenRef.scrollTop = nextScroll
}

export function OnTouchMove(e) {
	e.stopPropagation()
	// const scrollTop = this.screenRef.scrollTop
	// const thisScroll = this.state.lastScrollY - e.touches[0].pageY
	// const isBeyondContainer = scrollTop + thisScroll < 0

	// if (!isBeyondContainer) {
	//	e.stopPropagation()
	// }

	// this.setState({
	//	lastScrollY: e.touches[0].pageY
	// })
}
