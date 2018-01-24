export default function(state=0, action) {
	switch (action.type) {
		case 'USER_SCROLLED':
			return action.payload
		default:
			return state
	}
}
