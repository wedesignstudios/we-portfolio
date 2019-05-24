import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';
import classNames from 'classnames';

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
    this.props.navLocation(this.props.location.pathname);
  }

  componentWillUpdate(nextProps, nextState) {
    let location = this.props.location.pathname;

    if(this.state !== nextState && location !== nextProps.location.pathname) {
      this.props.navLocation(nextProps.location.pathname);
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
    let { navOpen, screenWidth } = this.state,
        location = this.props.location.pathname,
        navbarMainClass = classNames({
          'row': true,
          'justify-content-center': location === '/',
          'justify-content-left': location !== '/',
          'm-0': true,
          'nav-bg-white': location !== '/'
        }),
        navColClass = classNames({
          'col-xl-9': location === '/',
          'col-lg-12': true,
          'p-0': true
        }),
        navClass = classNames({
          'navbar': true,
          'navbar-expand-sm': true,
          'nav-opened': navOpen,
          'navbar-black': location !== '/',
          'px-sm-5': location !== '/'
        }),
        navULClass = classNames({
          'navbar-nav': true,
          'nav-justified': true,
          'align-items-center': true,
          'justify-content-center': location === '/',
          'justify-content-start': location != '/'
        }),
        navLIBaseClass = classNames({
          'nav-item': true,
          'nav-font-size': location != '/' && screenWidth >= 576,
          'flex-grow-0': location != '/'
        }),
        navLIClass = classNames(navLIBaseClass, {
          'mr-sm-4': location != '/'
        }),
        navImgLIClass = classNames(navLIBaseClass, {
          'mr-5': location != '/'
        }),
        navLinkClass = classNames({
          'nav-link': true,
          'mb-sm-0': true
        });

    return (
      <div id="navbar-main" className={navbarMainClass}>
        <div className={navColClass}>
          <nav className={navClass}>
            <a className="navbar-brand" href="/">
              {navOpen || location === '/' ?
                <img src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-white.svg" alt="WE eye logo" /> :
                <img src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-black.svg" alt="WE eye logo" />
              }
            </a>
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

            <div id="navbar-nav" className="collapse navbar-collapse">
              <ul className={navULClass} onClick={(e) => { this.navOpened(e); this.closeNav(e) }}>
              { location != '/' && screenWidth > 767 ?
                <li id="nav-we-eye-logo" className={navImgLIClass}>
                  <Link to="/">
                      <img
                        className="mx-auto"
                        src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-black.svg"
                        onLoad={(e) => this.props.navReady('navBar')} />
                  </Link>
                </li>
              : null }
                <li className={navLIClass}>
                  <NavLink to="/work" className={navLinkClass} activeClassName="nav-active">Work</NavLink>
                </li>
                <li className={navLIClass}>
                  <NavLink to="/about" className={navLinkClass} activeClassName="nav-active">About</NavLink>
                </li>
                { location === '/' && screenWidth > 767 ?
                  <li id="nav-we-eye-logo" className={navLIClass}>
                    <Link to="/">
                        <img
                          className="mx-auto nav-logo-home-page"
                          src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-white.svg"
                          onLoad={(e) => this.props.navReady('navBar')} />
                    </Link>
                  </li>
                : null }
                <li className={navLIClass}>
                  <NavLink to="/press" className={navLinkClass} activeClassName="nav-active">Press</NavLink>
                </li>
                <li className={navLIClass}>
                  <NavLink to="/contact" className={navLinkClass} activeClassName="nav-active">Contact</NavLink>
                </li>
              </ul>
            </div>

          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
