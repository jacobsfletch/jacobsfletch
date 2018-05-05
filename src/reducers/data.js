const defaultState = {
	portfolio: [],
	blog: [],
	globals: [],
	resume: []
}

export default (state = defaultState, action) => {

	switch (action.type) {

		case 'PORTFOLIO_LOADED':
			return {
				...state,
				portfolio: action.payload
			}

		case 'BLOG_LOADED':
			return {
				...state,
				blog: action.payload
			}

		case 'GLOBALS_LOADED':
			return {
				...state,
				globals: action.payload
			}

		case 'RESUME_LOADED':
			return {
				...state,
				resume: action.payload
			}

		default:
			return state

	}
}
