import React from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ArticleCard from '../../elements/articlecard/ArticleCard'

import './blog.css'

class BlogScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let articles = this.props.blog.map((article, index) =>
            <ArticleCard
                key={article._id}
                data={article}
                index={index}
            />
        )
        return (
            <ul className="screen-blog" >
                {articles}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        blog: state.blog
    }
}

export default withRouter(connect(mapStateToProps)(BlogScreen))
