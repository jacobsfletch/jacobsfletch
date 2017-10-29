import React from 'react';
import { Route } from 'react-router-dom';

import Portfolio from './portfolio/Portfolio';
import Contact from './contact/Contact';
import Project from './project/Project';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action Creator
const screenChanged = (screenName) => {
    console.log('screen has changed asshole')
    return {
        type: 'SCREEN_CHANGED',
        payload: screenName
    }
}

class Screen extends React.Component {
    changeScreenTitle(screenName) {
        if (screenName === "") {
            screenName = "index"
        }
        screenChanged(screenName)
        // console.log(screenChanged(screenName))
    }
    render() {
        return (
            <div className="app-body">
                <Route exact path='/' render={(props) => (
                    <Portfolio {...props} changeScreenTitle={this.changeScreenTitle.bind(this)} />
                )}/>
                <Route exact path='/home' render={(props) => (
                    <Portfolio {...props} changeScreenTitle={this.changeScreenTitle.bind(this)} />
                )}/>
                <Route exact path="/portfolio" component={Portfolio} changeScreenTitle={this.changeScreenTitle.bind(this)}/>
                <Route exact path="/contact" component={Contact} changeScreenTitle={this.changeScreenTitle.bind(this)}/>
                <Route exact path="/portfolio/:projectName" component={Project} changeScreenTitle={this.changeScreenTitle.bind(this)}/>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({screen: screenChanged}, dispatch)
}

export default connect(matchDispatchToProps)(Screen)
