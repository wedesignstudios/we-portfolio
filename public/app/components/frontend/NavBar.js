import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div id="navbar-main">
        <ul>
          <li><Link to="/press">Press</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><img src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-white.svg" /></li>
          <li><Link to="/work">Work</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    );
  }
}

module.exports = NavBar;