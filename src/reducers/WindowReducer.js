export default function(state='', action) {
    switch (action.type) {
        case 'VIEWPORT_CALCULATED':
            return action.payload
        default:
            return state
    }
}
