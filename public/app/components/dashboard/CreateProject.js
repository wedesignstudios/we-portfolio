import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormProject from './FormProject';

class CreateProject extends React.Component {
  render() {
    return (
      <div>
        <FormProject sendRequestType="POST" />
      </div>
    );
  }
}

export default CreateProject;
