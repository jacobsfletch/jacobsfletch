import React from 'react';
import ProjectThumbnail from '../../elements/projectthumbnail/ProjectThumbnail';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './portfolio.css';

const clickedMe = () => {
    console.log('you selected me asshole')
    return {
        type: 'CLICKED_ME',
        payload: 'ASSHOLE!'
    }
}

class Portfolio extends React.Component {
    componentDidMount() {
        const screenName = this.props.location.pathname.replace(/\//g, "")
        this.props.changeScreenTitle(screenName)
    }
    render() {
        return (
            <ul className="screen-portfolio">
                <li>Details</li>
                <li onClick={() => this.props.clickedMe()}>Click Me</li>
                <ProjectThumbnail projectName="cultivores" thumbnailImage="/img/cultivores-mobile-b copy.jpg" altText="cultivores" />
                <ProjectThumbnail projectName="third-wave-coffee" thumbnailImage="/img/third-wave-coaster copy.jpg" altText="third wave coffee" />
            </ul>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({clickedMe: clickedMe}, dispatch)
}

export default connect(matchDispatchToProps)(Portfolio)
