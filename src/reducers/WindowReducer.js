export default function(state='', action) {
	switch (action.type) {
		case 'WINDOW_RESIZED':
			return action.payload
		default:
			return state
	}
}
