
const error = (store) => (next) => (action) => {
    try {
        next(action)
    } catch(e) {
        console.log('error! error! ', e)
    }
}
