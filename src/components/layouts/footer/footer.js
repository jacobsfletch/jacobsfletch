import React from 'react'
import Timer from '../../modules/timer/Timer'
import Breadcrumbs from '../../modules/breadcrumbs/Breadcrumbs'
import BackToTop from '../../modules/backtotop/BackToTop'

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
                <div className="footer-subtitle">
                    <BackToTop />
                </div>
                <div className="cropmark br"></div>
            </div>
        )
    }
}

export default Footer
