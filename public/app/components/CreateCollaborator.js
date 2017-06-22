import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const FormCollaborator = require('./FormCollaborator');

class CreateCollaborator extends React.Component {
  render() {
    return(
      <div>
        <FormCollaborator sendRequestType="POST" />
      </div>
    );
  }
}

module.exports = CreateCollaborator;