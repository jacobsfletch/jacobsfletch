export default function(fieldName, value) {
    if (value.length === 0) { return true }
    if (fieldName === 'firstName' || fieldName === 'lastName') {
        const isAlphabetical = /^[a-zA-Z]+$/.test(value)
        if (isAlphabetical) { return true }
        else { return 'alphabet only' }
    } else if (fieldName === 'emailAddress') {
        const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const addressValid = emailValidator.test(value)
        if (addressValid) { return true }
        else { return 'invalid email' }
    } else if (fieldName === 'phoneNumber') {
        const phoneValidator = /^[(]{0,1}[0-9]{3}[).\- ]{0,1}[0-9]{3}[.\- ]{0,1}[0-9]{4}$/
        const phoneValid = phoneValidator.test(value)
        if (phoneValid) { return true }
        else { return 'invalid phone' }
    } else if (fieldName === 'select') {}
    else { return true }
}
