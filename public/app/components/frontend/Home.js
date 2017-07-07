import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';

const HomeLayout = require('./HomeLayout');
const Post = require('./Post');
const NotFound = require('../backend/NotFound');

class Home extends Component {
  render() {
    return (
      <Router>
        <div>          
          <Switch>
            <Route exact path={this.props.match.url} component={HomeLayout} />
            <Route exact path={`${this.props.match.url}:post_name`} component={Post} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = Home;