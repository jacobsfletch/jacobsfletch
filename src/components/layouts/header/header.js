import React from 'react';

import Swatch from '../../elements/swatch/Swatch'
import Progress from '../../modules/progress/Progress'
import { Link } from 'react-router-dom';

import './header.css';

export default class Header extends React.Component {
    render() {
        return (
            <header className="app-header">
                <div className="cropmark tl"></div>
                <div className="header-title">
                    <Link to="/">jacobsfletch.com</Link>
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
            </header>
        )
    }
}
