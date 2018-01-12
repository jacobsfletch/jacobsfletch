export default function(state=false, action) {
	switch (action.type) {
		case 'ACTIVATE_DOCK':
			return action.payload
		case 'DEACTIVATE_DOCK':
			return action.payload
		default:
			return state
	}
}
