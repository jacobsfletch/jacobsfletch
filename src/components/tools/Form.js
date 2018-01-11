function HandleChange(props) {
	const newState = {}
	const form = {...this.state.form}
	const key = Object.keys(props)[0]
	form[key] = props[key]
	newState.form = form
	newState.sent = false
	newState.status = 200
	this.setState(newState)
	for (const thisKey in this.state.form) {
		if (key === thisKey) {
			this.state.form[thisKey].showError = false
			this.setState(this.state.form[thisKey])
		}
	}
}

function ValidateFields() {
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

function ValidateForm() {
	for (const i in this.state.validityArray) {
		if (!this.state.validityArray[i]) {
			this.setState({'isValid': false})
		} else {
			this.setState({'isValid': true})
		}
	}
	this.setState({ 'validityArray': [] })
}

function BuildReqBody() {
	if (this.state.isValid) {
		this.setState({ inProgress: true })
		for (var i in this.state.form) {
			const key = i
			const value = this.state.form[i].value
			this.state.reqBody[i] = value
			const reqBody = this.state.reqBody
			this.setState({ reqBody })
		}
	} else { return }
}

export { HandleChange, BuildReqBody, ValidateFields, ValidateForm }
