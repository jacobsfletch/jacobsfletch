export default function(state={}, action) {
    switch (action.type) {
        case 'SCREEN_CHANGED':
            return action.payload
        case 'ROUTE_CHANGED':
            return action.payload
        default:
            return "not working asshole"
    }
}
