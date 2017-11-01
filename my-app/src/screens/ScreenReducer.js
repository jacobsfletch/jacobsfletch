export default function(state={}, action) {
    console.log('reduce!!!!!')
    switch (action.type) {
        case 'SCREEN_CHANGED':
            return action.payload
        default:
            return "not working asshole"
    }
}
