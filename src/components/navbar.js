import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import '../App.css';
import axios from 'axios'

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
        }).catch(error => {
            console.log('Logout error')
        })
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
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">Home</span>
                                    </Link>
                                    <Link to="/survey" className="btn btn-link">
                                        <span className="text-secondary">Take Survey</span>
                                    </Link>
                                    <Link to="/saved" className="btn btn-link">
                                        <span className="text-secondary">Saved Jobs</span>
                                    </Link>
                                    <Link to="/results" className="btn btn-link">
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
                    <div className="col-4 col-mr-auto">
                        <h1 className="App-title">Career Survey</h1>
                    </div>
                </header>
            </div>

        );

    }
}

export default Navbar