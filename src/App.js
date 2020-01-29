import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link, Redirect } from 'react-router-dom'

// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'
import Survey from './components/Survey/survey'
import Jobs from './components/jobs'
import Saved from './components/savedJob'
import WecomePage from './components/welcome'
import NotLoggedIn from './components/notLoggedIn'

// images
import backgroundImg from './img/city-scape1.jpg';
import Savedjobs from './components/savedJob';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">

        {/* Navbar */}
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />

        {/* greet user if logged in: */}
        {this.state.loggedIn
          // &&  <p className="greeting">{this.state.username} is logged in</p>
        }
        {/* Routes to different components */}



        {/* Routes */}
        <Route
          exact path="/"
          component={Home}
        />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup />}
        />
        
        <Route exact path="/jobs" component={() => <Jobs isloggedin={this.state.loggedIn} />} />
        <Route exact path="/survey" component={() => <Survey isloggedin={this.state.loggedIn} />} />
        <Route exact path="/saved" component={() => <Saved isloggedin={this.state.loggedIn} />} />
        <Route exact path="/welcome" component={() => <WecomePage isloggedin={this.state.loggedIn} />} />
        <Route exact path="/loggedout" component={() => <NotLoggedIn />} />


      </div>
    );
  }
}

export default App;
