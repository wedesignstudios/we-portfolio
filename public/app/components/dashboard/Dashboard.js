import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';

const DashboardHome = require('./DashboardHome');
const CreateProject = require('./CreateProject');
const GetProjects = require('./GetProjects');
const UpdateProject = require('./UpdateProject');
const CreateClient = require('./CreateClient');
const GetClients = require('./GetClients');
const UpdateClient = require('./UpdateClient');
const CreateCollaborator = require('./CreateCollaborator');
const GetCollaborators = require('./GetCollaborators');
const UpdateCollaborator = require('./UpdateCollaborator');
const UploadImages = require('./UploadImages');
const GetImages = require('./GetImages');
const CreateNewsStory = require('./CreateNewsStory');
const GetNewsStories = require('./GetNewsStories');
const UpdateNewsStory = require('./UpdateNewsStory');
const NotFound = require('./NotFound');

class Dashboard extends Component {
  render() {
    return (
      <Router>
      <div>
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <h1>WE Portfolio Dashboard</h1>
            <NavLink exact to={`${this.props.match.url}`} activeStyle={{fontWeight: 'bold',  color: 'red'}}>Dashboard Home</NavLink>
          </div>
        </div>
        <Switch>
          <Route exact path={`${this.props.match.url}`} component={DashboardHome} />
          <Route path={`${this.props.match.url}/clients/create`} component={CreateClient} />
          <Route path={`${this.props.match.url}/clients/:id/update`} component={UpdateClient} />
          <Route path={`${this.props.match.url}/clients`} component={GetClients} />
          <Route path={`${this.props.match.url}/collaborators/create`} component={CreateCollaborator} />
          <Route path={`${this.props.match.url}/collaborators/:id/update`} component={UpdateCollaborator} />
          <Route path={`${this.props.match.url}/collaborators`} component={GetCollaborators} />
          <Route path={`${this.props.match.url}/images/upload`} component={UploadImages} />
          <Route path={`${this.props.match.url}/images`} component={GetImages} />
          <Route path={`${this.props.match.url}/news-stories/create`} component={CreateNewsStory} />
          <Route path={`${this.props.match.url}/news-stories/:id/update`} component={UpdateNewsStory} />
          <Route path={`${this.props.match.url}/news-stories`} component={GetNewsStories} />
          <Route path={`${this.props.match.url}/projects/create`} component={CreateProject} />
          <Route path={`${this.props.match.url}/projects/:id/update`} component={UpdateProject} />
          <Route path={`${this.props.match.url}/projects`} component={GetProjects} />
          <Route component={NotFound} />
        </Switch>
      </div>
      </Router>
    );
  }
}

module.exports = Dashboard;