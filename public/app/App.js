// React code starts here
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const CreateProject = require('./components/CreateProject');
const CreateClient = require('./components/CreateClient');
const CreateCollaborator = require('./components/CreateCollaborator');
const UpdateImage = require('./components/UpdateImage');
const UploadImages = require('./components/UploadImages');
const GetImages = require('./components/GetImages');

class App extends Component {

  render() {
    return (
      <div>
        <CreateProject />
        <CreateClient />
        <CreateCollaborator />
        <UpdateImage />
        <UploadImages />
        <GetImages />
      </div>
    )
  }

}

ReactDOM.render(
  (
    <div>
      <App />
    </div>
  ),
  document.getElementById('app')
);