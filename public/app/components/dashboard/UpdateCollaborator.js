import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import FormCollaborator from './FormCollaborator';

class UpdateCollaborator extends Component {
  render() {
    return(
      <div>
        <FormCollaborator sendRequestType="PUT" collaboratorId={this.props.match.params.id} />
      </div>
    );
  }
}

export default UpdateCollaborator;
