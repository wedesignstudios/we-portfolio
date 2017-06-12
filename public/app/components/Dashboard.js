import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const CreateProject = require('./CreateProject');
const UpdateProject = require('./UpdateProject');
const CreateClient = require('./CreateClient');
const CreateCollaborator = require('./CreateCollaborator');
const UploadImages = require('./UploadImages');
const GetImages = require('./GetImages');

class Dashboard extends Component {

  render() {
    return (
      <div>
        <a href='/logout'>Logout</a>
        <UpdateProject projectId='79' />
        <CreateProject />
        <CreateClient />
        <CreateCollaborator />       
        <UploadImages />
        <GetImages />
      </div>
    );
  }
}

module.exports = Dashboard;