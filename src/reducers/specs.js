const defaultState = {
	ratioScrolled: 0,
	viewportSize: 0,
	scrollDir: 'down',
	portfolioSize: 0,
	dock: false,
	id: '',
	route: ''
}

export default (state=defaultState, action) => {

	switch (action.type) {

		case 'USER_SCROLLED':
			return {
				...state,
				ratioScrolled: action.payload
			}

		case 'WINDOW_RESIZED':
			return {
				...state,
				viewportSize: action.payload
			}
		case 'CHANGE_ROUTE':
			return {
				...state,
				route: action.payload
			}

		case 'RESIZE_PORTFOLIO':
			return {
				...state,
				portfolioSize: action.payload
			}

		case 'UPDATE_ID':
			return {
				...state,
				id: action.payload
			}

		case 'ACTIVATE_DOCK':
			return {
				...state,
				dock: action.payload
			}
			
		case 'DEACTIVATE_DOCK':
			return {
				...state,
				dock: action.payload
			}

		default:
			return state

	}
}
