export default function(state=[], action) {
    switch (action.type) {
        case 'BLOG_LOADED':
            return action.payload
        default:
            return state
    }
}
