export default function(state=null, action) {
    switch(action.type) {
        case "SCREEN_CHANGED": return action.payload
        break
    }
    return state
}
