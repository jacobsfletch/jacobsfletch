export function updateId(id) {
	return {
		type: 'ID_UPDATED',
		payload: id
	}
}

export function activateDock(color) {
	return {
		type: 'DOCK_ACTIVATED',
		payload: {
			status: true,
			color
		}
	}
}

export function deactivateDock() {
	return {
		type: 'DOCK_DEACTIVATED',
		payload: {
			status: false,
			color: null
		}
	}
}

export function selectProject(id) {
	return {
		type: 'PROJECT_SELECTED',
		payload: {
			selectedProject: id
		}
	}
}
