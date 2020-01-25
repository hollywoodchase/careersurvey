import React, { Component } from 'react';
import "./app-style.css";

class NotLoggedIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="home-page">
            <div className="whoops-box">
                
                    <h2>Whoops!</h2>

                    <p>You need to log in to see this page ☹️</p> 

                    <h5><a href="/login">Log In</a></h5> or
                    <h5><a href="/signup">Sign Up</a></h5>
            </div>
        </div>
        )
        
    }
}

export default NotLoggedIn;