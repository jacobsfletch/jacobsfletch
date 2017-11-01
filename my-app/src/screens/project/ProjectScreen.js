import React from 'react';

import './project.css';

export default class Project extends React.Component {
    componentDidMount() {
        //const screenName = this.props.location.pathname
    }
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
