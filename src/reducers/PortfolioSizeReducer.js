export default function(state='', action) {
	switch (action.type) {
		case 'RESIZE_PORTFOLIO':
			return action.payload
		default:
			return state
	}
}
