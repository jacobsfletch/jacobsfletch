export default function(state=[], action) {
	switch (action.type) {
		case 'LOAD_GLOBALS':
			return action.payload
		default:
			return state
	}
}
