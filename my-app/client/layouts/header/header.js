import React from 'react';

import Swatch from '../../elements/swatch/Swatch'
import Progress from '../../modules/progress/Progress'

import './header.css';

export default class Header extends React.Component {
    activateDock(color) {
        this.props.activateDock(color)
    }
    render() {
        return (
            <div className="app-header">
                <div className="cropmark tl"></div>
                <h1 className="header-title">title</h1>
                <div className="swatches">
                    <Swatch color="cyan" activateDock={this.activateDock.bind(this)}/>
                    <Swatch color="magenta" activateDock={this.activateDock.bind(this)}/>
                    <Swatch color="yellow" activateDock={this.activateDock.bind(this)}/>
                    <Swatch color="black" activateDock={this.activateDock.bind(this)}/>
                </div>
                <div className="cropmark tr"></div>
                <div className="header-after">
                    <Progress />
                </div>
            </div>
        )
    }
}
