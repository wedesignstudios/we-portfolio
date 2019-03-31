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
import NavAdmin from './NavAdmin';
import NavBar from './NavBar';
import PreFooter from './PreFooter';
import Footer from './Footer';
import Index from './Index';
import About from './About';
import Press from './Press';
import PressStory from './PressStory';
import Work from './Work';
import WorkProject from './WorkProject';
import Contact from './Contact';
import Post from './Post';
import NotFound from '../dashboard/NotFound';

class Layout extends Component {
  constructor() {
    super();

    this.state = {
      navAdminReady: false,
      navBarReady: false
    }

    this.navReady = this.navReady.bind(this);
    this.navNotReady = this.navNotReady.bind(this);
    this.navContainerHeightMargin;
  }

  componentWillUpdate(nextProps, nextState) {
    // Get height of #nav-container
    if(this.state !== nextState && nextState.navBarReady !== false) {
      let height = document.getElementById('nav-container').clientHeight;
      this.navContainerHeightMargin = ((height/16)+1.375)+'rem';
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
        <div className="row m-0 height-100">
          <div className="wrapper col-12 px-0">
          <div className="row mx-0">
            <div id="nav-container">
              {this.props.auth ? <NavAdmin navReady={this.navReady} /> : null}
              <NavBar navReady={this.navReady} navNotReady={this.navNotReady} />
            </div>
            {this.state.navBarReady ?
              <div className="col-12 container-fluid p-0">
                <Switch>
                  <Route exact path={this.props.match.url} component={Index} />
                  <Route exact path={`${this.props.match.url}about`} render={props => <About {...props} margin={this.navContainerHeightMargin} />} />
                  <Route exact path={`${this.props.match.url}press`} render={props => <Press {...props} margin={this.navContainerHeightMargin} />} />
                  <Route path={`${this.props.match.url}press/:title`} render={props => <PressStory {...props} margin={this.navContainerHeightMargin} />} />
                  <Route exact path={`${this.props.match.url}work`} render={props => <Work {...props} margin={this.navContainerHeightMargin} />} />
                  <Route path={`${this.props.match.url}work/:name`} render={props => <WorkProject {...props} margin={this.navContainerHeightMargin} />} />
                  <Route exact path={`${this.props.match.url}contact`} render={props => <Contact {...props} margin={this.navContainerHeightMargin} />} />
                  <Route exact path={`${this.props.match.url}:post_name`} render={props => <Post {...props} margin={this.navContainerHeightMargin} />} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            : null}
            </div>
            </div>
          <div className="col-12 container-fluid p-0">
            <PreFooter />
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default Layout;
