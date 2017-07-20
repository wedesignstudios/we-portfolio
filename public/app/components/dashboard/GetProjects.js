import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const UpdateProject = require('./UpdateProject');
const DateFormatter = require('../../services/date_formatter')

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
    this.resetFlashMessage = this.resetFlashMessage.bind(this);

  }

  loadProjects() {
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

  resetFlashMessage() {
    this.props.history.push(location, {message: ''});
  }

  componentDidMount() {
    this.loadProjects();
  }

  componentWillUpdate(nextProps) {
    this.flashMessage = nextProps.history.location.state.message;
    if(this.props.history.location.state.message !== '') {
      setTimeout(this.resetFlashMessage, 3000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.projectsData.length !== this.state.projectsData.length) {
      this.loadProjects();
    }
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-sm-6">

          <div className="container-fluid">
            <div className="row">
              <h2 className="font-weight-bold">All Projects</h2>
              <Link to={`${this.props.match.url}/create`} className="btn btn-primary ml-auto">Add New Project</Link>
            </div>
            <div className="row">
              <hr className="col" />
            </div>

            {this.flashMessage ?
              <div className="alert alert-success">
                {this.flashMessage}
              </div> :
            null}

            <div className="row">
              {this.state.projectsData.map(project => {
                let projectDate = new Date(project.date);
                return (
                  <div className="col-sm-2 mb-4" key={project.id}>
                    <div className="card line-height-1-25-rem">
                      {project.images.length > 0 ?
                        <Link to={`${this.props.match.url}/${project.id}/update`}>
                          <img className="card-img-top img-fluid" src={project.images[0].url} alt={project.images[0].alt} />
                        </Link> :
                      null}
                      <div className="card-block p-3">
                        <p className="card-title mb-2">
                          <Link to={`${this.props.match.url}/${project.id}/update`} className="text-muted">
                            {project.name}
                          </Link>
                        </p>
                      </div>
                      <div className="card-footer text-muted px-3 py-1">
                        <p className="card-text mb-0">
                          <small className="text-muted">
                            {DateFormatter.monthYear(projectDate)}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = GetProjects;