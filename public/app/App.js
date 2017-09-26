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
import {Helmet} from 'react-helmet';

const Layout = require('./components/frontend/Layout');
const Dashboard = require('./components/dashboard/Dashboard');
const Login = require('./components/dashboard/Login');
const NotFound = require('./components/dashboard/NotFound');

const PrivateRoute = ({ component: Component, path, auth, redirectPath }) => (
  <Route path={path} render={props => (
    auth ? (
      <Component match={props.match} auth={auth} />
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
    fetch('/api/user-data', {credentials: 'include'})
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
        <div className="col container-fluid p-0 height-100">
          <Helmet
            titleTemplate="WE Design Studios | %s"
            defaultTitle="WE Design Studios">
              <meta charSet="utf-8" />
              <title>WE Design Studios</title>
              <meta property="og:title" content="WE Design Studios" />
              <meta name="description" content="WE Design Studios is an Austin, TX based design firm that creates visual identities, graphics, posters, logos, illustrations, apps and websites." />
              <meta property="og:description" content="WE Design Studios is an Austin, TX based design firm that creates visual identities, graphics, posters, logos, illustrations, apps and websites." />  
              <meta property="og:image" content="https://we-portfolio.s3.amazonaws.com/we-social.png" />
              <link rel="canonical" href="https://wedesignstudios.com/" />
              <meta property="og:url" content="https://wedesignstudios.com" />
              <meta property="og:locale" content="en_US" />
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="WE Design Studios" />
          </Helmet>
          <Switch>
            <PrivateRoute path='/login' component={Login} auth={!this.state.loggedIn} redirectPath='/dashboard' />
            <PrivateRoute path='/dashboard' component={Dashboard} auth={this.state.loggedIn} redirectPath='/login' />
            <Route path='/' component={props => <Layout {...props} auth={this.state.loggedIn} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }

}

ReactDOM.render(
  (
    <div className="row m-0 height-100">
      <App />
    </div>
  ),
  document.getElementById('app')
);