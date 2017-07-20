import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class NavDashboard extends Component {

  render() {
    return(
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse row justify-content-center mb-3">
        <div className="col-6">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}`}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/projects`}>Projects</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/news-stories`}>News Stories</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/clients`}>Clients</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/collaborators`}>Collaborators</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/images`}>Images</Link></li>
            <li className="nav-item ml-auto"><Link className="nav-link btn btn-outline-secondary" to="/logout">Logout</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

module.exports = NavDashboard;