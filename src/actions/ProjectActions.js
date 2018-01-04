export function selectProject(id) {
	return {
		type: 'PROJECT_SELECTED',
		payload: {
			selectedProject: id
		}
	}
}
