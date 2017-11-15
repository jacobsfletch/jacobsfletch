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
            color: ''
        }
    }
}

export function getPortfolio(data) {
    return {
        type: 'PORTFOLIO_LOADED',
        payload: data
    }
}
