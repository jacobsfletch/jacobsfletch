export default function(state=[], action) {
	switch (action.type) {
		case 'RESUME_LOADED':
			return action.payload
		default:
			return state
	}
}
