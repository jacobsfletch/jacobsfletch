export function getPortfolio(data) {
	return {
		type: 'PORTFOLIO_LOADED',
		payload: data
	}
}

export function getBlog(data) {
	return {
		type: 'BLOG_LOADED',
		payload: data
	}
}

export function getGlobals(data) {
	return {
		type: 'GLOBALS_LOADED',
		payload: data
	}
}

export function getResume(data) {
	return {
		type: 'RESUME_LOADED',
		payload: data
	}
}

export function setViewportSize(viewportSize) {
	return {
		type: 'VIEWPORT_CALCULATED',
		payload: {
			width: viewportSize.width,
			height: viewportSize.height
		}
	}
}

export function resizePortfolio(portfolioSize) {
	return {
		type: 'PORTFOLIO_RESIZED',
		payload: {
			width: portfolioSize.width,
			height: portfolioSize.height
		}
	}
}

export function updateId(id) {
	return {
		type: 'ID_UPDATED',
		payload: id
	}
}
