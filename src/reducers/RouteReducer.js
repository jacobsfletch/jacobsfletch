export default function(state='', action) {
	switch (action.type) {
		case 'CHANGE_ROUTE':
			return action.payload
		default:
			return state
	}
}
