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
import NavDashboard from './NavDashboard';
import DashboardHome from './DashboardHome';
import CreateProject from './CreateProject';
import GetProjects from './GetProjects';
import UpdateProject from './UpdateProject';
import WorkProject from '../frontend/WorkProject';
import CreateClient from './CreateClient';
import GetClients from './GetClients';
import UpdateClient from './UpdateClient';
import CreateCollaborator from './CreateCollaborator';
import GetCollaborators from './GetCollaborators';
import UpdateCollaborator from './UpdateCollaborator';
import GetImages from './GetImages';
import CreateNewsStory from './CreateNewsStory';
import GetNewsStories from './GetNewsStories';
import UpdateNewsStory from './UpdateNewsStory';
import NotFound from './NotFound';

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

export default Dashboard;
