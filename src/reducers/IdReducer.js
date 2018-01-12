export default function(state=false, action) {
	switch (action.type) {
		case 'UPDATE_ID':
			return action.payload
		default:
			return state
	}
}
