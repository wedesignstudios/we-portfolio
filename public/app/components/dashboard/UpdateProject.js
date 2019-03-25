import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import FormProject from './FormProject';

class UpdateProject extends React.Component {
  render() {
    return (
      <div>
        <FormProject sendRequestType="PUT" projectId={this.props.match.params.id} />
      </div>
    );
  }
}

export default UpdateProject;
