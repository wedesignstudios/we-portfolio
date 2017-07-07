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
const About = require('./About');
const Press = require('./Press');
const Work = require('./Work');
const Contact = require('./Contact');
const Post = require('./Post');
const NotFound = require('../backend/NotFound');

class Home extends Component {
  render() {
    return (
      <Router>
        <div>          
          <Switch>
            <Route exact path={this.props.match.url} component={HomeLayout} />
            <Route exact path={`${this.props.match.url}about`} component={About} />
            <Route exact path={`${this.props.match.url}press`} component={Press} />
            <Route exact path={`${this.props.match.url}work`} component={Work} />
            <Route exact path={`${this.props.match.url}contact`} component={Contact} />
            <Route exact path={`${this.props.match.url}:post_name`} component={Post} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = Home;