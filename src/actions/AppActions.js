export function getPortfolio(data) {
    return {
        type: 'PORTFOLIO_LOADED',
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

export function resizeWindow(viewportSize) {
    return {
        type: 'WINDOW_RESIZED',
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
