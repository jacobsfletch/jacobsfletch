export function HandleChange(fieldObject) {
	const newState = {...this.state}
	const form = newState.form
	const key = Object.keys(fieldObject)[0]
	form[key] = fieldObject[key]
	newState.form = form
	newState.sent = false
	newState.status = 200
	for (const thisKey in newState.form) {
		if (key === thisKey) {
			newState.form[thisKey].showError = false
			this.setState( newState )
		}
	}
}

export function ValidateFields() {
	for (const key in this.state.form) {
		if (!this.state.form[key].isValid) {
			this.state.form[key].showError = true
			this.setState(this.state.form[key])
			const validityArray = this.state.validityArray
			validityArray.push(false)
			this.setState({ validityArray })
		}
	}
}

export function BuildReqBody() {
	this.setState({ inProgress: true })
	for (var i in this.state.form) {
		const value = this.state.form[i].value
		this.state.reqBody[i] = value
		const reqBody = this.state.reqBody
		this.setState({ reqBody })
	}
}
