import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const FormCollaborator = require('./FormCollaborator');

class UpdateCollaborator extends Component {
  render() {
    return(
      <div>
        <Link to='/dashboard/update-collaborators'>All Collaborators</Link><br />
        <FormCollaborator sendRequestType="PUT" collaboratorId={this.props.match.params.id} />
      </div>
    );
  }
}

module.exports = UpdateCollaborator;