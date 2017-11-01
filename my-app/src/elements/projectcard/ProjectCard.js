import React from 'react';
import { Link } from 'react-router-dom';

import './projectthumbnail.css';

export default class ProjectThumbnail extends React.Component {
    render() {
        const imgUrl = this.props.thumbnailImage
        const altText = this.props.altText
        const projectName = this.props.projectName
        const projectSlug = `/portfolio/${projectName}`
        return (
            <li className="project-thumbnail">
                <Link to={projectSlug}>
                    <img src={imgUrl} alt={altText} className="thumbnail-image" />
                    <div className="thumbnail-meta">
                        <h5 className="thumbnail-title">{projectName}</h5>
                        <h5 className="thumbnail-subtitle">project tags</h5>
                    </div>
                </Link>
            </li>
        )
    }
}
