import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const FormProject = require('./FormProject');

class UpdateProject extends React.Component {
  render() {
    return (
      <div>
        <FormProject sendRequestType="PUT" projectId={this.props.match.params.id} />
      </div>
    );
  }
}

module.exports = UpdateProject;