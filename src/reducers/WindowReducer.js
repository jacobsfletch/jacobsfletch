export default function(state='', action) {
	switch (action.type) {
		case 'MEASURE_VIEWPORT':
			return action.payload
		default:
			return state
	}
}
