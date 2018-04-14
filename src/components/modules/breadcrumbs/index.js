import React from 'react';

import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './index.css'

const mapStateToProps = state => {
	return state
}

const Breadcrumbs = (props) => {
	return (
		<Crumb pathname={props.location.pathname}/>
	)
}

function Crumb(pathname) {
	const pathArray = pathname.pathname.split('/').filter(Boolean)
	pathArray.unshift('jacobsfletch')
	let listItems =
		pathArray.map(function(path, i) {
			let href = (path === 'jacobsfletch') ? '' : path
			var links =
				(pathArray.length === i + 1) ? <p>{path}</p> : <Link to={`/${href}`}>{path}</Link>
			return (
				<li key={path} className='list-item'>
					{links}
				</li>
			)
		})
	return (
		<ul>
			{listItems}
		</ul>
	)
}

export default withRouter(connect(mapStateToProps)(Breadcrumbs))
