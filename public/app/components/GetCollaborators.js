import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class GetCollaborators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaboratorsData: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: 'No message.'};
    }

    this.flashMessage = this.props.history.location.state.message;

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

  componentWillUpdate(nextProps) {
    this.flashMessage = nextProps.history.location.state.message;
  }

  render() {
    return(
      <div>
        <p>Message: {this.flashMessage}</p>
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