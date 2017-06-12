import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormProject = require('./FormProject');

class UpdateProject extends React.Component {
  constructor() {
    super();

    this.state = {
      name: ''      
    }
    
  }

  componentDidMount() {
    fetch(`/api/projects/${this.props.projectId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          name: data.name          
        })
      })
      .catch((err) => {
        console.error(err);
      });      
  }

  render() {
    return (
      <div>
        <h3>CREATE/UPDATE PROJECT: {this.state.name}</h3>
        <FormProject sendRequestType="PUT" projectId={this.props.projectId} />
      </div>
    );
  }
}

module.exports = UpdateProject;