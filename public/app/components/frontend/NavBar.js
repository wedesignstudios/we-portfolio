import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';

class NavBar extends Component {
  constructor() {
    super();
    this.state ={
      navOpen: false,
      screenWidth: 0
    }
  }

  componentDidMount() {
    this.setState({screenWidth: window.innerWidth});
  }

  componentWillUpdate(nextProps, nextState) {
    let location = this.props.location.pathname;
    if(this.state !== nextState && location !== nextProps.location.pathname) {
      this.props.navNotReady('navBar');
      setTimeout(() => {this.props.navReady('navBar')}, 400);
    }
  }

  navOpened() {
    this.setState({navOpen: !this.state.navOpen})
  }

  closeNav() {
    $("#navbar-nav").collapse('hide');
  }

  render() {
    let { navOpen, screenWidth } = this.state;
    let location = this.props.location.pathname;
    return (
      <div id="navbar-main" className="row justify-content-center">
        <div className="col-xl-9 col-lg-12">
          <nav className={"navbar navbar-toggleable-sm " + (navOpen ? 'nav-opened ' : '') + (location !== '/' ? 'navbar-black' : '') }>
            <button
              className="navbar-toggler navbar-toggler-right collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-nav"
              aria-controls="navbar-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={(e) => this.navOpened(e)} >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">
              {navOpen || location === '/' ?
                <img src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-white.svg" alt="WE eye logo" /> :
                <img src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-black.svg" alt="WE eye logo" />
              }
            </a>

            <div id="navbar-nav" className="collapse navbar-collapse">
              <ul className="navbar-nav nav-justified align-items-center justify-content-center" onClick={(e) => { this.navOpened(e); this.closeNav(e) }}>
                <li className="nav-item">
                  <NavLink to="/work" className="nav-link" activeClassName="nav-active">Work</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link" activeClassName="nav-active">About</NavLink>
                </li>
                <li id="nav-we-eye-logo" className="nav-item">
                  <Link to="/">
                    {location === '/' && screenWidth > 767 ?
                      <img
                        className="mx-auto"
                        src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-white.svg"
                        onLoad={(e) => this.props.navReady('navBar')} /> :
                      <img
                        className="mx-auto"
                        src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-black.svg"
                        onLoad={(e) => this.props.navReady('navBar')} />
                    }
                  </Link>
                </li>
                <li className="nav-item">
                  <NavLink to="/press" className="nav-link" activeClassName="nav-active">Press</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link" activeClassName="nav-active">Contact</NavLink>
                </li>
              </ul>
            </div>

          </nav>
        </div>
      </div>
    );
  }
}

module.exports = withRouter(NavBar);