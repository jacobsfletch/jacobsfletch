export default function(state={}, action) {
    switch (action.type) {
        case 'DOCK_ACTIVATED':
            return action.payload
        case 'DOCK_DEACTIVATED':
            return action.payload
        default:
            return "not working asshole"
    }
}
