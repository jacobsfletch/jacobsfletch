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
                    <time className="card-date">{this.props.data.publishedDate}</time>
                    <Link to={slug}>
                        <h2 className="card-title">{this.props.data.title}</h2>
                    </Link>
                    <p className="card-caption">{this.props.data.caption}</p>
                </div>
                <hr />
            </li>
        )
    }
}
