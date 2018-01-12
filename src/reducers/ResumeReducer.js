export default function(state=[], action) {
	switch (action.type) {
		case 'LOAD_RESUME':
			return action.payload
		default:
			return state
	}
}
