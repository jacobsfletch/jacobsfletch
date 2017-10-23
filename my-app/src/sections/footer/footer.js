import React from 'react';
import Timer from '../../modules/timer/Timer';

import './footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="app-footer">
                <div className="cropmark bl"></div>
                <div className="footer-title">
                    <Timer />
                </div>
                <p className="footer-subtitle">...</p>
                <div className="cropmark br"></div>
            </div>
        )
    }
}
