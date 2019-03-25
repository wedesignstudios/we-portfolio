import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import FormCollaborator from './FormCollaborator';

class CreateCollaborator extends React.Component {
  render() {
    return(
      <div>
        <FormCollaborator sendRequestType="POST" />
      </div>
    );
  }
}

export default CreateCollaborator;
