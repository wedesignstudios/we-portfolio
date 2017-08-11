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

const NavAdmin = require('./NavAdmin');
const NavBar = require('./NavBar');
const Footer = require('./Footer');
const Index = require('./Index');
const About = require('./About');
const Press = require('./Press');
const Work = require('./Work');
const Contact = require('./Contact');
const Post = require('./Post');
const NotFound = require('../dashboard/NotFound');

class Layout extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="fixed-top">
            {this.props.auth ? <NavAdmin /> : null}
            <NavBar />
          </div>
          <Switch>
            <Route exact path={this.props.match.url} component={Index} />
            <Route exact path={`${this.props.match.url}about`} component={About} />
            <Route exact path={`${this.props.match.url}press`} component={Press} />
            <Route exact path={`${this.props.match.url}work`} component={Work} />
            <Route exact path={`${this.props.match.url}contact`} component={Contact} />
            <Route exact path={`${this.props.match.url}:post_name`} component={Post} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

module.exports = Layout;