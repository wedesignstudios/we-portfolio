import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

class DashboardHome extends Component {

  render() {
    return(
      <div>
        <ul>
          <li><Link to={`${this.props.match.url}/create-project`}>Add A New Project</Link></li>
          <li><Link to={`${this.props.match.url}/create-client`}>Add A New Client</Link></li>
          <li><Link to={`${this.props.match.url}/create-collaborator`}>Add A New Collaborator</Link></li>
          <li><Link to={`${this.props.match.url}/upload-images`}>Upload Images</Link></li>
          <li><Link to={`${this.props.match.url}/update-images`}>Update Images</Link></li>
          <li><Link to={`${this.props.match.url}/update-projects`}>Update Projects</Link></li>
          <li><Link to={`${this.props.match.url}/update-clients`}>Update Clients</Link></li>
          <li><Link to={`${this.props.match.url}/update-collaborators`}>Update Collaborators</Link></li>
        </ul>
      </div>
    );
  }
}

module.exports = DashboardHome;