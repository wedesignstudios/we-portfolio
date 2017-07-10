import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const UpdateProject = require('./UpdateProject');

class GetProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectsData: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: 'No message.'};
    }

    this.flashMessage = this.props.history.location.state.message;

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

  componentWillUpdate(nextProps) {
    this.flashMessage = nextProps.history.location.state.message;
  }

  render() {
    return(
      <div>
        <p>Message: {this.flashMessage}</p>
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