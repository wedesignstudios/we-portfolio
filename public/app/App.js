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

const CreateClient = require('./components/CreateClient');
const Dashboard = require('./components/Dashboard');
const Login = require('./components/Login');
const NotFound = require('./components/NotFound');

const PrivateRoute = ({ component: Component, path, auth }) => (
  <Route path={path} render={props => (
    auth ? (
      <Component />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/protected' component={CreateClient} auth={true} />
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