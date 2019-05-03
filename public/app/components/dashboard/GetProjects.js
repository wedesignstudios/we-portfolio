import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import ImageSizePicker from '../../services/image_size_picker';
import DateFormatter from '../../services/date_formatter';
import FormValidations from '../../services/form_validations';
import classNames from 'classnames';

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

  loadProjects() {
    fetch('/api/v1/projects')
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

  componentDidMount() {
    this.loadProjects();
  }

  componentWillUpdate(nextProps) {
    if(this.props.history.location.state !== undefined) {
      this.flashMessage = nextProps.history.location.state.message;

      if(this.props.history.location.state.message !== '') {
        setTimeout(() => FormValidations.resetFlashMessage(this), 3000);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.projectsData.length !== this.state.projectsData.length) {
      this.loadProjects();
    }
  }

  render() {
    return(
      <div className="row m-0 justify-content-center">
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

            <div className="row justify-content-center">
              <div className="card-columns">
                {this.state.projectsData.map(project => {
                  let projectDate = new Date(project.date);
                  let coverImage = project.feature_image.image;
                  let visibleBtnIconClass = classNames(
                    'fas',
                    {'fa-eye': project.visible == true},
                    {'fa-eye-slash text-danger': project.visible == false || project.visible == null}
                  );

                  return (
                    <div key={project.id}>
                      <div className="card line-height-1-25-rem">
                        <Link to={`${this.props.match.url}/${project.id}/update`} className="text-muted">
                          {project.images.length > 0 ?
                            <div>
                              {coverImage ?
                                <img
                                  className="card-img-top img-fluid"
                                  src={ImageSizePicker.imgSize(coverImage.orig_name).thumb300}
                                  alt={coverImage.alt} /> :
                                <img
                                  className="card-img-top img-fluid"
                                  src={ImageSizePicker.imgSize(project.images[0].orig_name).thumb300}
                                  alt={project.images[0].alt} />
                              }
                            </div> :
                            null}
                            <div className="card-block p-3">
                              <p className="card-title mb-2">
                                  {project.name}
                              </p>
                              <p className="mb-0"><i className={visibleBtnIconClass} aria-hidden="true"></i></p>
                            </div>
                          <div className="card-footer text-muted px-3 py-1">
                            <p className="card-text mb-0">
                              <small className="text-muted">
                                {DateFormatter.monthYear(projectDate)}
                              </small>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetProjects;
