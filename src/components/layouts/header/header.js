import React from 'react';

import Swatch from '../../elements/swatch/Swatch'
import Progress from '../../modules/progress/Progress'

import './header.css';

export default class Header extends React.Component {
    render() {
        return (
            <div className="app-header">
                <div className="cropmark tl"></div>
                <div className="header-title">
                    <a href="/">jacobsfletch.com</a>
                </div>
                <div className="swatches">
                    <Swatch color="cyan"/>
                    <Swatch color="magenta"/>
                    <Swatch color="yellow"/>
                    <Swatch color="black"/>
                </div>
                <div className="cropmark tr"></div>
                <div className="header-after">
                    <Progress />
                </div>
            </div>
        )
    }
}
