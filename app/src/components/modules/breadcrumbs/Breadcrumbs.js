import React from 'react';

import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import './breadcrumbs.css';

function Crumb(pathname) {
    const pathArray = pathname.pathname.split('/').filter(Boolean)
    pathArray.unshift('index')
    let listItems =
        pathArray.map(function(path, i) {
            let href = (path === 'index') ? '' : path
            var links =
                (pathArray.length === i+1) ? <p>{path}</p> : <Link to={`/${href}`}>{path}</Link>
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

class Breadcrumbs extends React.Component {
    render() {
        return (
            <Crumb pathname={this.props.location.pathname}/>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(Breadcrumbs))
