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
import {Helmet} from 'react-helmet';

const NavDashboard = require('./NavDashboard');
const DashboardHome = require('./DashboardHome');
const CreateProject = require('./CreateProject');
const GetProjects = require('./GetProjects');
const UpdateProject = require('./UpdateProject');
const WorkProject = require('../frontend/WorkProject');
const CreateClient = require('./CreateClient');
const GetClients = require('./GetClients');
const UpdateClient = require('./UpdateClient');
const CreateCollaborator = require('./CreateCollaborator');
const GetCollaborators = require('./GetCollaborators');
const UpdateCollaborator = require('./UpdateCollaborator');
const GetImages = require('./GetImages');
const CreateNewsStory = require('./CreateNewsStory');
const GetNewsStories = require('./GetNewsStories');
const UpdateNewsStory = require('./UpdateNewsStory');
const NotFound = require('./NotFound');

class Dashboard extends Component {
  render() {
    return (
      <Router>
      <div className="row m-0">
        <div className="col container-fluid p-0">
          <NavDashboard match={this.props.match} loggedIn={this.props.auth} />
          <Switch>
            <Route exact path={`${this.props.match.url}`} component={DashboardHome} />
            <Route path={`${this.props.match.url}/clients/create`} component={CreateClient} />
            <Route path={`${this.props.match.url}/clients/:id/update`} component={UpdateClient} />
            <Route path={`${this.props.match.url}/clients`} component={GetClients} />
            <Route path={`${this.props.match.url}/collaborators/create`} component={CreateCollaborator} />
            <Route path={`${this.props.match.url}/collaborators/:id/update`} component={UpdateCollaborator} />
            <Route path={`${this.props.match.url}/collaborators`} component={GetCollaborators} />
            <Route exact path={`${this.props.match.url}/images`} component={GetImages} />
            <Route path={`${this.props.match.url}/news-stories/create`} component={CreateNewsStory} />
            <Route path={`${this.props.match.url}/news-stories/:id/update`} component={UpdateNewsStory} />
            <Route path={`${this.props.match.url}/news-stories`} component={GetNewsStories} />
            <Route path={`${this.props.match.url}/projects/create`} component={CreateProject} />
            <Route path={`${this.props.match.url}/projects/preview`} render={props => <WorkProject {...props} preview={true} />} />
            <Route path={`${this.props.match.url}/projects/:id/update`} component={UpdateProject} />
            <Route path={`${this.props.match.url}/projects`} component={GetProjects} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
      </div>
      </Router>
    );
  }
}

module.exports = Dashboard;