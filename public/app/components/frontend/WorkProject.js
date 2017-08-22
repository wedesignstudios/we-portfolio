import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;
const _groupBy = require('lodash/groupBy');
const _map = require('lodash/map');
const DateFormatter = require('../../services/date_formatter');

class WorkProject extends Component {
  constructor() {
    super();

    this.state = {
      projectData: []
    }

    this.featureImage;
    this.projectImages;
  }

  componentDidMount() {
    fetch(`/api/projects/${this.props.match.params.name}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          projectData: data
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state !== nextState) {
      let { projectData } = nextState;
      let groupedImages = _groupBy(projectData.images, 'id');
      let imagesOrder = projectData.project_images_sort_order.images_order;
      let orderedImages = _map(imagesOrder, function(i) {
          return groupedImages[i].shift();
        });

      this.featureImage = orderedImages.splice(0,1)[0];
      this.projectImages = orderedImages;
    }
  }

  scrollToTop() {
    scroll.scrollToTop({duration: 1000});
  }

  render() {
    let { projectData } = this.state;
    let { margin } = this.props;
    let projectDate = new Date(projectData.date);

    if(projectData.length < 1) return null;

    return(
      <div id="work-project" className="row mx-0" style={{marginTop: margin}}>
        <div
          id="project-feature-image"
          className="feature-image-container col-12 p-0">
            <img
              className="img-fluid"
              src={this.featureImage.url}
              title={this.featureImage.title}
              alt={this.featureImage.alt} />
        </div>
        <div
          id="press-text"
          className="col-12 container p-0">
            <div className="row justify-content-center m-0">
              <div className="col-8 container p-0 mb-5rem mt-5">
                <h6 className="text-uppercase letter-spacing-point125-rem line-height-1-45-rem">{projectData.name}</h6>
                <hr className="hr-1rem" />
                <div className="row m-0">
                  <div id="project-info" className="col-sm-6 p-0 pr-sm-3">
                    <p className="font-weight-bold m-0 letter-spacing-point125-rem">{projectData.clients.length === 1 ? 'Client' : 'Clients'}</p>
                    <p>{projectData.clients.map(client => {
                        return client.name;
                      }).join(', ')
                    }</p>

                    <p className="font-weight-bold m-0 letter-spacing-point125-rem">{projectData.project_categories.length === 1 ? 'Service' : 'Services'}</p>
                    <p>{projectData.project_categories.map(category => {
                        return category.name;
                      }).join(', ')
                    }</p>

                    <p className="font-weight-bold m-0 letter-spacing-point125-rem">{projectData.collaborators.length === 1 ? 'Collaborator' : 'Collaborators'}</p>
                    <p>{projectData.collaborators.map(collaborator => {
                        return collaborator.name;
                      }).join(', ')
                    }</p>
                  </div>
                  <div className="col-sm-6 p-0 pl-sm-3">
                    <div className="white-space-pre-line">{projectData.description}</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div
          id="project-images"
          className="col-12 p-0">
          <div className="row justify-content-center m-0">
            <div className="col-12 col-sm-8 container p-0 mb-5rem mt-5">
              {this.projectImages.map(image => {
                return(
                  <div
                    key={image.id}
                    className="mb-5">
                      <img
                        className="img-fluid w-100"
                        src={image.url}
                        title={image.title}
                        alt={image.alt} />
                  </div>
                )
              })}
              <p className="text-center pt-4">
                <span
                  style={{cursor: 'pointer'}}
                  onClick={this.scrollToTop} >
                  BACK TO TOP
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

module.exports = WorkProject;