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
                    <h1 className="screen-title">
                        hello, my name is jacob fletcher.
                        <br /><br />
                        i am a designer and web developer.
                        this is my website.
                        it is a place to <Link to={"/Portfolio"}>see</Link> my work,
                        a place to <Link to={"/"}>read</Link> my thoughts,
                        and somewhere to <Link to={"/"}>buy</Link> my stuff.
                        <br /><br />
                        Feel free to <Link to={"/doodle"}>draw</Link> me a picture, by all means.
                        Or, <Link to={"/contact"}>write</Link> me a letter if you feel so inclined.
                    </h1>
                </article>
            </section>
        )
    }
}
