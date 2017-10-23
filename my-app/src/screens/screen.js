import React from 'react';
import { Route } from 'react-router-dom';

import Portfolio from './portfolio/Portfolio';
import Contact from './contact/Contact';
import Project from './project/Project';

export default class Screen extends React.Component {
    render() {
        return (
            <div className="app-body">
                <Route exact path="/" component={Portfolio} />
                <Route exact path="/portfolio" component={Portfolio} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/portfolio/:projectName" component={Project} />
            </div>
        )
    }
}
