import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormProject = require('./FormProject');

class CreateProject extends React.Component {
  render() {
    return (
      <div>
        <FormProject sendRequestType="POST" />
      </div>
    );
  }
}

module.exports = CreateProject;