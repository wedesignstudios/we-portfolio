import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const UpdateProject = require('./UpdateProject');

class GetProjects extends Component {
  constructor() {
    super();

    this.state = {
      projectsData: []
    }
  }

  componentDidMount() {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          projectsData: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return(
      <div>
        <Link to={`${this.props.match.url}/create`}>Add New Project</Link>
        <h3>All Projects</h3>
          <div>
            {this.state.projectsData.map(project =>
              <div key={project.id}><Link to={`${this.props.match.url}/${project.id}/update`}>{project.name}</Link></div>
            )}
          </div>
      </div>
    );
  }
}

module.exports = GetProjects;