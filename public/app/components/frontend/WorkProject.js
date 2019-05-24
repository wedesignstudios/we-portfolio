import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Scroll from 'react-scroll';
import { Helmet } from 'react-helmet';
import ImageSizePicker from '../../services/image_size_picker';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

const scroll = Scroll.animateScroll;

class WorkProject extends Component {
  constructor() {
    super();

    this.state = {
      projectData: []
    }

    this.projectImages;
  }

  componentDidMount() {
    if (this.props.preview) {
      this.getProject('/api/v1/projects/preview');
    } else {
      this.getProject(`/api/v1/projects/${this.props.match.params.name}`);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state !== nextState) {
      let { projectData } = nextState;
      let groupedImages = groupBy(projectData.images, 'id');
      let imagesOrder = projectData.project_images_sort_order.images_order;
      let orderedImages = map(imagesOrder, function(i) {
          return groupedImages[i].shift();
        });

      this.projectImages = orderedImages;
    }
  }

  getProject(apiUrl) {
    fetch(apiUrl,
        {
          method: 'GET',
          credentials: 'include'
        }
      )
      .then(res => res.json())
      .then(data => {
        this.setState({
          projectData: data
        });
      })
      .catch(err => {
        console.error('fetch err: ', err);
      });
  }

  scrollToTop() {
    scroll.scrollToTop({duration: 1000});
  }

  render() {
    let { projectData } = this.state,
        projectDate = new Date(projectData.date),
        featureImgSizes,
        featureImage;

    if(projectData.feature_image !== undefined) {
      featureImage = projectData.feature_image.image;
      featureImgSizes = ImageSizePicker.imgSize(projectData.feature_image.image.orig_name);
    }

    if(projectData.length < 1) return null;

    return(
      <div id="work-project" className="row mx-0">
        <div
          id="project-feature-image"
          className="col-12 p-0 d-flex align-items-center feature-image">
            <img
              className="img-fluid"
              src={featureImgSizes.w300}
              srcSet={`${featureImgSizes.w300} 300w, ${featureImgSizes.w800} 800w, ${featureImgSizes.w1024} 1024w, ${featureImgSizes.w1440} 1440w, ${featureImage.url} 2560w`}
              sizes="100vw"
              width="2560"
              title={featureImage.title}
              alt={featureImage.alt} />
        </div>
        <div id="project-text" className="col-12 container p-0">
            <div className="row justify-content-center m-0">
              <div className="col-10 col-lg-8 col-xl-6 container p-0 mb-2rem mt-5">
                <h2 className="text-uppercase letter-spacing-point125-rem muli-bold">{projectData.name}</h2>
                <hr className="hr-point7rem mb-4" />
                <div className="row m-0">
                  <div id="project-info" className="col-sm-6 p-0 pr-sm-3">
                    <h5 className="muli-bold m-0 letter-spacing-point05-rem">{projectData.clients.length === 1 ? 'Client' : 'Clients'}</h5>
                    <p>{projectData.clients.map(client => {
                        return client.name;
                      }).join(', ')
                    }</p>

                    <h5 className="muli-bold m-0 letter-spacing-point05-rem">{projectData.project_categories.length === 1 ? 'Service' : 'Services'}</h5>
                    <p>{projectData.project_categories.map(category => {
                        return category.name;
                      }).join(', ')
                    }</p>

                    {projectData.collaborators.length > 0 ?
                      <div>
                        <h5 className="muli-bold m-0 letter-spacing-point05-rem">{projectData.collaborators.length === 1 ? 'Collaborator' : 'Collaborators'}</h5>
                        <p>{projectData.collaborators.map(collaborator => {
                            return collaborator.name;
                          }).join(', ')
                        }</p>
                      </div> :
                    null }
                  </div>
                  <div className="col-sm-6 p-0 pl-sm-3">
                    <div className="white-space-pre-line" dangerouslySetInnerHTML={{__html: projectData.description}}></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div
          id="project-images"
          className="col-12 p-0">
          <div className="row justify-content-center m-0">
            <div className="col-10 col-lg-8 col-xl-6 container p-0 mb-5rem mt-5">
              {this.projectImages.map(image => {
                let imageSizes = ImageSizePicker.imgSize(image.orig_name);
                return(
                  <div
                    key={image.id}
                    className="mb-5">
                      <img
                        className="img-fluid w-100"
                        title={image.title}
                        alt={image.alt}
                        src={imageSizes.w300}
                        srcSet={`${imageSizes.w600} 600w, ${imageSizes.w800} 800w, ${imageSizes.w1024} 1024w, ${imageSizes.w1440}  1440w, ${image.url} 2560w`}
                        sizes="100vw"
                        width="1706" />
                  </div>
                )
              })}
              <p className="text-center pt-4 muli-bold">
                <span
                  className="back-to-top"
                  onClick={this.scrollToTop} >
                  BACK TO TOP
                </span>
              </p>
            </div>
          </div>
        </div>
        <Helmet>
          <title>{projectData.name}</title>
        </Helmet>
      </div>
    );
  };
}

export default WorkProject;
