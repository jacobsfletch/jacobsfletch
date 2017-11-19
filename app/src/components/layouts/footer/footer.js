import React from 'react'
import Timer from '../../modules/timer/Timer'
import Breadcrumbs from '../../modules/breadcrumbs/Breadcrumbs'

import './footer.css'

class Footer extends React.Component {
    render() {
        return (
            <div className="app-footer">
                <div className="cropmark bl"></div>
                <nav className="footer-breadcrumbs">
                    <Breadcrumbs />
                </nav>
                <div className="footer-title">
                    <Timer />
                </div>
                <p className="footer-subtitle">...</p>
                <div className="cropmark br"></div>
            </div>
        )
    }
}

export default Footer
