import React, { Component } from 'react'
import NotLoggedIn from "./notLoggedIn"
import "./app-style.css";

class WelcomePage extends Component {

    renderWelcomePage = () => {
        return (
            <div className="home-page">
                <div className="home-box">
                    <h3 className="home-header">
                        Welcome!
                    </h3>
                    <div className="home-text">

                        <p>If this is your first time here, you should start by taking our career survey. This survey will ask questions about your preferences in order to find a selection of jobs well suited for you. Once you find some jobs you might be interested in, click the "Save" button to save them for later.</p>

                        <a href="/survey" className="btn button">Take the survey</a>

                        <p className="welcome">If you've been here before and have found some jobs you wanted to keep in mind, click below to check out your saved jobs.</p>

                        <a href="/saved" className="btn button">See your saved jobs</a>

                        <p className="welcome">And, of course, tastes change all the time, so feel free to retake the survey and see what other career opportunites are out there for you!</p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return <div>
           {this.props.isloggedin ? this.renderWelcomePage() : <NotLoggedIn />}
        </div>
        
    }
}

export default WelcomePage;
