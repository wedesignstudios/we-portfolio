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
const PressStory = require('./PressStory');
const Work = require('./Work');
const Contact = require('./Contact');
const Post = require('./Post');
const NotFound = require('../dashboard/NotFound');

class Layout extends Component {
  constructor() {
    super();

    this.state = {
      navAdminReady: false,
      navBarReady: false
    }

    this.navReady = this.navReady.bind(this);
    this.navNotReady = this.navNotReady.bind(this);
    this.navContainerHeight;
  }

  componentWillUpdate(nextProps, nextState) {
    // Get height of #nav-container
    if(this.state !== nextState && nextState.navBarReady !== false) {
      this.navContainerHeight = document.getElementById('nav-container').clientHeight;
    }
  }

  navReady(navName) {
    this.setState({[navName + 'Ready']: true});
  }

  navNotReady(navName) {
    this.setState({[navName + 'Ready']: false});
  }

  render() {
    return (
      <Router>
        <div className="row m-0">
          <div id="nav-container" className="fixed-top">
            {this.props.auth ? <NavAdmin navReady={this.navReady} /> : null}
            <NavBar navReady={this.navReady} navNotReady={this.navNotReady} />
          </div>
          {this.state.navBarReady ?
            <div className="col container-fluid p-0">
              <Switch>
                <Route exact path={this.props.match.url} component={Index} />
                <Route exact path={`${this.props.match.url}about`} render={props => <About {...props} margin={this.navContainerHeight} />} />
                <Route exact path={`${this.props.match.url}press`} render={props => <Press {...props} margin={this.navContainerHeight} />} />
                <Route path={`${this.props.match.url}press/:title`} render={props => <PressStory {...props} margin={this.navContainerHeight} />} />
                <Route exact path={`${this.props.match.url}work`} render={props => <Work {...props} margin={this.navContainerHeight} />} />
                <Route exact path={`${this.props.match.url}contact`} render={props => <Contact {...props} margin={this.navContainerHeight} />} />
                <Route exact path={`${this.props.match.url}:post_name`} render={props => <Post {...props} margin={this.navContainerHeight} />} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </div>
          : null}
        </div>
      </Router>
    );
  }
}

module.exports = Layout;