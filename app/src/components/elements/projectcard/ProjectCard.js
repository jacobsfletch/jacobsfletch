import React from 'react';
import { Link } from 'react-router-dom';

import './projectcard.css';

export default function ProjectCard(data) {
    const slug = `/portfolio/${data.data.slug}`
    let categories = data.data.categories.map(function(category) {
        return <li key={category.name} className="card-category">{category.name}</li>
    })
    let client = data.data.client ? 'client: ' + data.data.client : 'personal project'
    return (
        <li className="project-card">
            <Link to={slug}>
                <img alt="alt text" src={data.data.featuredImage} className="card-image" />
                <div className="card-meta">
                    <h5 className="card-client">{client}</h5>
                    <h5 className="card-title">{data.data.title}</h5>
                    <ul className="card-categories">{categories}</ul>
                </div>
            </Link>
        </li>
    )
}
