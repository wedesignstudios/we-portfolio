import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

class DashboardHome extends Component {

  render() {
    return(
      <div>
        <ul>
          <li><Link to={`${this.props.match.url}/clients`}>Clients</Link></li>
          <li><Link to={`${this.props.match.url}/collaborators`}>Collaborators</Link></li>
          <li><Link to={`${this.props.match.url}/images`}>Images</Link></li>
          <li><Link to={`${this.props.match.url}/news-stories`}>News Stories</Link></li>
          <li><Link to={`${this.props.match.url}/projects`}>Projects</Link></li>
        </ul>
      </div>
    );
  }
}

module.exports = DashboardHome;