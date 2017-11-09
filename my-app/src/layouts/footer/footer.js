import React from 'react'
import Timer from '../../modules/timer/Timer'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import './footer.css'

class Footer extends React.Component {
    render() {
        const paths = this.props.mountedScreen
        //const path = paths.map(function(path) {
        //    return <a key={path} href={path}>{path}</a>
        //})
        //var tags = this.props.mountedScreen.map(function(i, item) {
        //    return <a key={i}>{item}</a>
        //});
        const path = this.props.location.pathname.split("/")
        path.splice(0, 1, "index")
        return (
            <div className="app-footer">
                <div className="cropmark bl"></div>
                <div className="footer-breadcrumbs">
                    {path}
                </div>
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
