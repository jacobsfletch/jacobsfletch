import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import './projectcard.css';

export default function ProjectCard(data) {
    const slug = `/portfolio/${data.data.slug}`
    return (
        <li className="project-thumbnail">
            <Link to={slug}>
                <img src={data.data.featuredImage} className="thumbnail-image" />
                <div className="thumbnail-meta">
                    <h5 className="thumbnail-title">{data.data.title}</h5>
                    <h5 className="thumbnail-subtitle">project tags</h5>
                </div>
            </Link>
        </li>
    )
}
