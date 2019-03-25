import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class NavDashboard extends Component {

  render() {
    return(
      <nav id="nav-dashboard" className="navbar navbar-toggleable-md navbar-inverse bg-inverse row justify-content-center mx-0 mb-3">
        <div className="col-6">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}`}>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/projects`}>Projects</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/news-stories`}>News Stories</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/clients`}>Clients</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/collaborators`}>Collaborators</Link></li>
            <li className="nav-item"><Link className="nav-link" to={`${this.props.match.url}/images`}>Images</Link></li>
            <li className="nav-item ml-auto"><a className="nav-link btn btn-outline-secondary" href="/logout">Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default NavDashboard;
