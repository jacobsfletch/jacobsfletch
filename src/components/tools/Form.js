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
		if (key !== thisKey) {
			this.state.form[key].showError = false
			this.setState(this.state.form[thisKey])
		}
	}
}

function HandleSubmit(e) {
	e.preventDefault()
	for (const key in this.state.form) {
		if (!this.state.form[key].isValid) {
			this.state.form[key].showError = true
			this.setState(this.state.form[key])
			this.setState({'isValid': false})
		}
	}
	if (this.state.isValid) {
		console.log('valid')
		this.setState({inProgress: true})
		let formData = {}
		for (var i in this.state) {
			const value = this.state[i].value
			formData[i] = value
		}
		return formData
	} else { return false }
}

export { HandleChange, HandleSubmit }
