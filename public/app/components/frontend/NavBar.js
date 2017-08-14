import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  NavLink
} from 'react-router-dom';

class NavBar extends Component {
  constructor() {
    super();
    this.state ={
      navOpen: false
    }
  }

  navOpened() {
    this.setState({navOpen: !this.state.navOpen})
  }

  closeNav() {
    $("#navbarNav").collapse('hide');
  }

  render() {
    let { navOpen } = this.state;
    return (
      <div id="navbar-main" className="row justify-content-center">
        <div className="col-xl-9 col-lg-12">
          <nav className={"navbar navbar-toggleable-sm " + (navOpen ? 'nav-opened' : '')}>
            <button
              className="navbar-toggler navbar-toggler-right collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={(e) => this.navOpened(e)} >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">
              <img src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-white.svg" alt="WE eye logo" />
            </a>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav nav-justified align-items-center justify-content-center" onClick={(e) => { this.navOpened(e); this.closeNav(e) }}>
                <li className="nav-item">
                  <NavLink to="/work" className="nav-link" activeClassName="nav-active">Work</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link" activeClassName="nav-active">About</NavLink>
                </li>
                <li id="nav-we-eye-logo" className="nav-item">
                  <Link to="/"><img className="mx-auto"src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-white.svg" /></Link>
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

module.exports = NavBar;