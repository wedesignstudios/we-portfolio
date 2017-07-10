import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  NavLink
} from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div id="navbar-main" className="row justify-content-center">
        <div className="col-9">
          <ul className="nav nav-justified align-items-center justify-content-center">
            <li className="nav-item">
              <NavLink to="/work" className="nav-link" activeClassName="nav-active">Work</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" activeClassName="nav-active">About</NavLink>
            </li>
            <li className="nav-item">
              <Link to="/"><img className="nav-link mx-auto"src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-white.svg" /></Link>
            </li>
            <li className="nav-item">
              <NavLink to="/press" className="nav-link" activeClassName="nav-active">Press</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" activeClassName="nav-active">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = NavBar;