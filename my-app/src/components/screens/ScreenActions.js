export function screenChanged(screenName) {
    return {
        type: 'SCREEN_CHANGED',
        payload: screenName
    }
}

export function routeChanged(routePath) {
    return {
        type: 'ROUTE_CHANGED',
        payload: routePath
    }
}
