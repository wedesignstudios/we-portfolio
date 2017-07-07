import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/press">Press</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/work">Work</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    );
  }
}

module.exports = NavBar;