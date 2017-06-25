import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class GetCollaborators extends Component {
  constructor() {
    super();

    this.state = {
      collaboratorsData: []
    }
  }

  componentDidMount() {
    fetch('/api/collaborators')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          collaboratorsData: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return(
      <div>
        <Link to={`${this.props.match.url}/create`}>Add New Collaborator</Link>
        <h3>All Collaborators</h3>
          <div>
            {this.state.collaboratorsData.map(collaborator =>
              <div key={collaborator.id}><Link to={`${this.props.match.url}/${collaborator.id}/update`}>{collaborator.name}</Link></div>
            )}
          </div>
      </div>
    );
  }
}

module.exports = GetCollaborators;