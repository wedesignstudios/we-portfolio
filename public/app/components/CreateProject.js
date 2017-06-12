import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormProject = require('./FormProject');

class CreateProject extends React.Component {

  render() {
    return (
      <div>
        <h3>Add A New Project</h3>
        <FormProject sendRequestType="POST" />
      </div>
    );
  }
}

module.exports = CreateProject;