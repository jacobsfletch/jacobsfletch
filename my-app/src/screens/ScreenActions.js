export function screenChanged(screenName) {
    return {
        type: 'SCREEN_CHANGED',
        payload: screenName
    }
}
