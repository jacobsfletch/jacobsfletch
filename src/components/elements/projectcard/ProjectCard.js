import React from 'react';
import { Link } from 'react-router-dom';

import './projectcard.css';

export default function ProjectCard(data) {
    let self = data.data
    const slug = `/portfolio/${self.slug}`
    const index = data.index + 1
    const newIndex = index < 10 ? "0" + index : index
    const client = self.clients ? self.clients.name : 'no client'
    const image = {backgroundImage: "url('" + self.featuredImage + "')"}
    return (
        <li className="project-card">
            <Link to={slug}>
                <p className="card-index">{newIndex}</p>
                <div className="card-image" style={image} />
                <div className="card-meta">
                    <h5 className="card-client">{client}</h5>
                    <h5 className="card-title">{self.title}</h5>
                </div>
            </Link>
        </li>
    )
}
