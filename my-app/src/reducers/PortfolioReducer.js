export default function(state=[], action) {
    switch (action.type) {
        case 'PORTFOLIO_LOADED':
            return action.payload
        default:
            return state
    }
}
