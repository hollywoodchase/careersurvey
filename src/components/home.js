import React, { Component } from 'react'
import Surveybuttons from './Survey/surveyButtons';
import "./app-style.css";

class Home extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div class="home-page">
            <div class="home-box">
                
                    <h2>Hey there!</h2>

                    <p>Most of life's big decisions feel overwhleming, and deciding what to do with your career is one of the bigger ones. But it's gonna be okay, because TKTK is here to help.</p> 

                    <p>TKTK offers a wide range of career oppotunities and ways to acheive them. Start by logging in and taking our career survey to determine a variety of jobs suited to your unique needs. Click on each of them to learn more, and save your favorites to come back to later.</p>

                    <a href="/signup" className="btn button">Let's get started!</a>

            </div>
        </div>
        )

    }
}

export default Home
