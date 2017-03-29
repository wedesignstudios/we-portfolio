// React code starts here
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const CreateProject = require('./components/CreateProject');
const CreateClient = require('./components/CreateClient');
const CreateCollaborator = require('./components/CreateCollaborator');

class App extends Component {

  render() {
    return (
      <div>
        <CreateProject />
        <CreateClient />
        <CreateCollaborator />
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