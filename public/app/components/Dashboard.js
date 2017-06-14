import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';

const CreateProject = require('./CreateProject');
const UpdateProject = require('./UpdateProject');
const CreateClient = require('./CreateClient');
const CreateCollaborator = require('./CreateCollaborator');
const UploadImages = require('./UploadImages');
const GetImages = require('./GetImages');
const NotFound = require('./NotFound');

class Dashboard extends Component {

  render() {
    return (
      <Router>
      <div>
        <Switch>
          <Route path={`${this.props.match.url}/create-project`} component={CreateProject} />
          <Route path={`${this.props.match.url}/create-client`} component={CreateClient} />
          <Route path={`${this.props.match.url}/create-collaborator`} component={CreateCollaborator} />
          <Route path={`${this.props.match.url}/upload-images`} component={UploadImages} />
          <Route path={`${this.props.match.url}/update-images`} component={GetImages} />
          <Route path={`${this.props.match.url}/update-project/:id`} component={UpdateProject} />
          <Route component={NotFound} />
        </Switch>
      </div>
      </Router>
    );
  }
}

module.exports = Dashboard;