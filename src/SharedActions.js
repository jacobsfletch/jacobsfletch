export function updateId(id) {
	return {
		type: 'UPDATE_ID',
		payload: id
	}
}

export function activateDock(color) {
	return {
		type: 'ACTIVATE_DOCK',
		payload: {
			status: true,
			color
		}
	}
}

export function deactivateDock() {
	return {
		type: 'DEACTIVATE_DOCK',
		payload: {
			status: false,
			color: null
		}
	}
}

export function selectProject(id) {
	return {
		type: 'SELECT_PROJECT',
		payload: {
			selectedProject: id
		}
	}
}
