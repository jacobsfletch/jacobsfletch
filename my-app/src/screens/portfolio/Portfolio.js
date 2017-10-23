import React from 'react';
import ProjectThumbnail from '../../elements/projectthumbnail/ProjectThumbnail';

import './portfolio.css';

export default class Portfolio extends React.Component {
    componentDidMount() {
        const screenName = this.props.location.pathname
        console.log(screenName)
        console.log(this.props)
    }
    render() {
        return (
            <ul className="screen-portfolio">
                <ProjectThumbnail projectName="cultivores" thumbnailImage="/img/cultivores-mobile-b copy.jpg" altText="cultivores" />
                <ProjectThumbnail projectName="third-wave-coffee" thumbnailImage="/img/third-wave-coaster copy.jpg" altText="third wave coffee" />
            </ul>
        )
    }
}
