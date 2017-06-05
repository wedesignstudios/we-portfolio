// React code starts here
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';

const Dashboard = require('./components/Dashboard');
const Login = require('./components/Login');
const NotFound = require('./components/NotFound');

const PrivateRoute = ({ component: Component, path, auth, redirectPath }) => (
  <Route path={path} render={props => (
    auth ? (
      <Component />
    ) : (
      <Redirect to={{
        pathname: redirectPath,
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: null
    }
  }

  componentDidMount() {
    fetch('/api/user_data', {credentials: 'include'})
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 1) {
          this.setState({
            loggedIn: true
          });
        } else {
          this.setState({
            loggedIn: false
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if(this.state.loggedIn === null) {
      return null;
    }
    return (
      <Router>
        <div>
          <p>Logged In?: {this.state.loggedIn ? 'true' : 'false'}</p>
          <Switch>
            <PrivateRoute path='/login' component={Login} auth={!this.state.loggedIn} redirectPath='/dashboard' />
            <PrivateRoute path='/dashboard' component={Dashboard} auth={this.state.loggedIn} redirectPath='/login' />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }

}

ReactDOM.render(
  (
    <div>
      <App />
    </div>
  ),
  document.getElementById('app')
);