import React from 'react'

import './index.css'

const Button = (props) => {
	return (
		<button type="submit"
		className={props.buttonClasses}
		disabled={props.disabled} >
			{props.buttonText}
		</button>
	)
}

export default Button
