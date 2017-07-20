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
      this.props.history.location.state = {message: ''};
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
      <div className="row justify-content-center">
        <div className="col-sm-6">
        {this.flashMessage ?
          <div className="alert alert-success">
            {this.flashMessage}
          </div> :
        null}

          <div className="container-fluid">
            <div className="row">
              <h3>All Projects</h3>
              <Link to={`${this.props.match.url}/create`} className="btn btn-primary ml-auto">Add New Project</Link>
            </div>
            <div className="row">
              <hr className="col" />
            </div>
            <div className="row">
                <div>
                  {this.state.projectsData.map(project =>
                    <div key={project.id}><Link to={`${this.props.match.url}/${project.id}/update`}>{project.name}</Link></div>
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = GetProjects;