import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  NavLink
} from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav id="navbar-main" className="row justify-content-center mt-3">
        <div className="col-9">
          <ul className="nav nav-justified align-items-center justify-content-center">
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
    );
  }
}

module.exports = NavBar;