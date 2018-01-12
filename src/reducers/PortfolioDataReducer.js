export default function(state=[], action) {
	switch (action.type) {
		case 'LOAD_PORTFOLIO':
			return action.payload
		default:
			return state
	}
}
