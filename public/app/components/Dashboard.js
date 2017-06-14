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

const DashboardHome = require('./DashboardHome');
const CreateProject = require('./CreateProject');
const UpdateProject = require('./UpdateProject');
const CreateClient = require('./CreateClient');
const CreateCollaborator = require('./CreateCollaborator');
const UploadImages = require('./UploadImages');
const GetImages = require('./GetImages');
const GetProjects = require('./GetProjects');
const NotFound = require('./NotFound');

class Dashboard extends Component {

  render() {
    return (
      <Router>
      <div>
        <h1>WE Portfolio Dashboard</h1>
        <Switch>
          <Route exact path={`${this.props.match.url}`} component={DashboardHome} />
          <Route path={`${this.props.match.url}/create-project`} component={CreateProject} />
          <Route path={`${this.props.match.url}/create-client`} component={CreateClient} />
          <Route path={`${this.props.match.url}/create-collaborator`} component={CreateCollaborator} />
          <Route path={`${this.props.match.url}/upload-images`} component={UploadImages} />
          <Route path={`${this.props.match.url}/update-images`} component={GetImages} />
          <Route path={`${this.props.match.url}/update-projects/:id`} component={UpdateProject} />
          <Route path={`${this.props.match.url}/update-projects`} component={GetProjects} />
          <Route component={NotFound} />
        </Switch>
      </div>
      </Router>
    );
  }
}

module.exports = Dashboard;