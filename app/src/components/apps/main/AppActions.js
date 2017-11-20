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
