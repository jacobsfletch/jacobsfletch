const defaultState = {
	viewportSize: 0,
	scrollTicker: 0,
	wheelTicker: 0,
	orientationTicker: 0,
	touchMoveTicker: 0,
	allMoveTicker: 0,
	scrollDir: 'down',
	isTouchDevice: false,
	deltaY: 0,
	lastScrollY: 0,
	screenSpecs: {
		clientHeight: 0,
		clientWidth: 0,
		offsetHeight: 0,
		offsetWidth: 0,
		offsetLeft: 0,
		scrollHeight: 0,
		scrollWidth: 0,
		scrollTop: 0,
		scrollLeft: 0,
		scrollRatio: 0,
		isFullyScrolled: false,
		isFullyUnscrolled: true,
		scrollDirection: 'vertical'
	},
	dock: false,
	id: '',
	route: ''
}

export default (state=defaultState, action) => {

	switch (action.type) {

		case 'USER_SCROLLED':
			return {
				...state,
				scrollTicker: action.payload,
				allMoveTicker: state.allMoveTicker + 1
			}

		case 'USER_WHEELED':
			return {
				...state,
				wheelTicker: action.payload.ticker,
				allMoveTicker: state.allMoveTicker + 1,
				deltaY: action.payload.deltaY
			}

		case 'USER_TOUCH_MOVED':
			return {
				...state,
				touchMoveTicker: action.payload.ticker,
				allMoveTicker: state.allMoveTicker + 1,
				thisScroll: action.payload.thisScroll
			}

		case 'IS_TOUCH_DEVICE':
			return {
				...state,
				isTouchDevice: action.payload
			}

		case 'VIEWPORT_MEASURED':
			return {
				...state,
				viewportSize: action.payload
			}

		case 'FULLY_SCROLLED':
			return {
				...state,
				screenSpecs: {
					...state.screenSpecs,
					isFullyScrolled: true,
					isFullyUnscrolled: false
				}
			}

		case 'FULLY_UNSCROLLED':
			return {
				...state,
				screenSpecs: {
					...state.screenSpecs,
					isFullyUnscrolled: true,
					isFullyScrolled: false
				}
			}

		case 'SCREEN_MEASURED':
			return {
				...state,
				screenSpecs: action.payload
			}

		case 'DEVICE_ROTATED':
			return {
				...state,
				orientationTicker: action.payload
			}

		case 'ROUTE_CHANGED':
			return {
				...state,
				route: action.payload
			}

		case 'ID_UPDATED':
			return {
				...state,
				id: action.payload
			}

		case 'DOCK_ACTIVATED':
			return {
				...state,
				dock: action.payload
			}

		case 'DOCK_DEACTIVATED':
			return {
				...state,
				dock: action.payload
			}

		default:
			return state

	}
}
