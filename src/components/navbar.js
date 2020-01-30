import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import '../App.css';
import axios from 'axios'
import Logo from "../img/KDC-logo.png"
class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }
    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        })
            // .then(function(response) {
            //     window.location.replace("/login");
            // })
            .catch(error => {
                console.log('Logout error')
            })
        window.location.href = "/login";
    }
    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        return (
            <div>
                <header className="navbar App-header" id="nav-container">
                    <div className="col-8" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary logout-link" onClick={this.logout}>
                                    <span className="text-secondary">Logout</span></Link>

                                {/* <Link to="/" className="btn btn-link text-secondary">
                                    <span className="text-secondary">Home</span>
                                </Link> */}

                                <Link to="/survey" className="btn btn-link">
                                    <span className="text-secondary">Take Survey</span>
                                </Link>
                                <Link to="/saved" className="btn btn-link">
                                    <span className="text-secondary">Saved Jobs</span>
                                </Link>
                                <Link to="/jobs" className="btn btn-link">
                                    <span className="text-secondary">Survey Results</span>
                                </Link>
                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Home</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Login</span>
                                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">Sign Up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <img className="logo" src={Logo} alt="logo" />
                    </div>
                </header>
            </div>
        );
    }
}
export default Navbar