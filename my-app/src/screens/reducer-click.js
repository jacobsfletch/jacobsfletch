export default function(click=null, action) {
    switch(action.type) {
        case "CLICKED_ME": return action.payload
        break
    }
    return click
}
