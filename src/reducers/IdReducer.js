export default function(state=false, action) {
	switch (action.type) {
		case 'ID_UPDATED':
			return action.payload
		default:
			return state
	}
}
