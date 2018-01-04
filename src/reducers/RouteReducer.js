export default function(state='', action) {
	switch (action.type) {
		case 'ROUTE_CHANGED':
			return action.payload
		default:
			return state
	}
}
