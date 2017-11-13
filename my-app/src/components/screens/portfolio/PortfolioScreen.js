import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

import ProjectCard from '../../elements/projectcard/ProjectCard';

import { getPortfolio } from '../ScreenActions'

import './portfolio.css';

class PortfolioScreen extends React.Component {
    componentWillMount() {
        fetch('/api/portfolio')
            .then(results => {
                return results.json()
            }).then(data => {
                this.props.getPortfolio(data)
            })
    }
    render() {
        let projects = this.props.portfolio.map(project =>
            <ProjectCard key={project._id} data={project} />
        )
        return (
            <ul className="screen-portfolio">{projects}</ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        portfolio: state.portfolio
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPortfolio: (data) => {
            dispatch(getPortfolio(data))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen))
