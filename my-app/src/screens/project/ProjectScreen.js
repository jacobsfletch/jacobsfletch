import React from 'react';
import { connect } from 'react-redux';

import './project.css';

class ProjectScreen extends React.Component {
    render() {
        const projectName = this.props.match.params.projectName
        const imgUrl = this.props.thumbnailImage
        return (
            <section className="screen-project">
                <img src={imgUrl} alt={this.props.altText} />
                <h1>{projectName}</h1>
                <p>Pellentesque rutrum tellus sit amet volutpat pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc purus purus, sodales in nulla ut, sagittis lobortis dui. Suspendisse lobortis sem et magna pellentesque, sit amet molestie felis venenatis. Sed pharetra maximus tellus, tristique viverra sem mattis vitae. Suspendisse ultricies mauris ac odio sagittis, vitae cursus ante ullamcorper.</p>
            </section>
        )
    }
}

export default ProjectScreen
