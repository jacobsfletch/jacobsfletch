import React from 'react';

import './footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="app-footer">
                <div className="cropmark"></div>
                <h6 className="footer-title">footer-title</h6>
                <p className="footer-subtitle"> footer-subtitle</p>
                <div className="cropmark"></div>
            </div>
        )
    }
}
