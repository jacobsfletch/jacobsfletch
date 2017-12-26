import React from 'react';
import { Link } from 'react-router-dom';


import './Home.css'

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onWheel = this.onWheel.bind(this)
    }
    onWheel(e) {
        const scrollY = e.deltaY
        const scrollTop = this.screenRef.scrollTop
        this.screenRef.scrollTop = scrollTop + scrollY
    }

    onTouchMove(e) {
        e.stopPropagation()
    }
    render() {
        return (
            <section className="screen-home" ref={(home) => { this.screenRef = home }} onWheel={this.onWheel} onTouchMove={this.onTouchMove}>
                <article className="screen-body">
                    <p>
                        hello, my name is jacob fletcher.
                        i am a designer and web developer.
                        this is my website.
                        it is a place to <Link to={"/Portfolio"}>show</Link> my work,
                        a place to <Link to={"/"}>share</Link> my thoughts,
                        and somewhere to <Link to={"/"}>sell</Link> my stuff.

                    </p>
                </article>
            </section>
        )
    }
}
