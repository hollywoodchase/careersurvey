import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import "./app-style.css";

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			error: false,
			errorMessage: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {

		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()
		this.setState({ error: false })

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.error) {
					console.log('successful signup')
					this.props.history.push("/login");
				} else {
					this.setState({ error: true, errorMessage: response.data.error })
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	render() {

		return (

			<div className="login-page">
				<form>
					<h3 className="header">Sign Up</h3>
					<div className="form-body">
						<label for="username">Username</label>
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<label for="password">Password</label>
						<input className="form-input"
							placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						<button onClick={this.handleSubmit} type="submit">Sign up</button>

						<p className="error">{this.state.error ? this.state.errorMessage : ""}</p>
						<p class="message">Already registered? <a href="/login">Log In</a></p>
					</div>
				</form>
			</div>

		)
	}
}

export default withRouter(Signup);
