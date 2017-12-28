import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './articlecard.css';

export default class ArticleCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const slug = `/blog/${this.props.data.slug}`
        return (
            <li className="article-card" ref={(card) => { this.cardRef = card }}>
                <div className="card-image" ref={(image) => { this.cardImgRef = image }} >
                    <Link to={slug} />
                </div>
                <div className="card-meta">
                    <h5 className="card-client">Me</h5>
                    <Link to={slug}>
                        <h5 className="card-title">{this.props.data.title}</h5>
                    </Link>
                </div>
            </li>
        )
    }
}
