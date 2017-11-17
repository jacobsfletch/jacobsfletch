import React from 'react'
import Timer from '../../modules/timer/Timer'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import './footer.css'

class Footer extends React.Component {
    render() {
        const path = this.props.location.pathname.split("/")
        path[0] = "index"
        let links = path.map(function(link) {
            return (
                <li className={'list-item'}>
                    <Link to={`/${link}`}>
                        {link}
                    </Link>
                </li>
            )
        })
        //path.splice(0, 1, "index")
        return (
            <div className="app-footer">
                <div className="cropmark bl"></div>
                <ul className="footer-breadcrumbs">
                    {links}
                </ul>
                <div className="footer-title">
                    <Timer />
                </div>
                <p className="footer-subtitle">...</p>
                <div className="cropmark br"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(Footer))
