export default function(state=false, action) {
	switch (action.type) {
		case 'DOCK_ACTIVATED':
			return action.payload
		case 'DOCK_DEACTIVATED':
			return action.payload
		default:
			return state
	}
}
