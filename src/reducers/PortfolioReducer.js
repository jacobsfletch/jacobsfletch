export default function(state='', action) {
	switch (action.type) {
		case 'PORTFOLIO_RESIZED':
			return action.payload
		default:
			return state
	}
}
