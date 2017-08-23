import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

const ImageSizePicker = require('../../services/image_size_picker');
const _groupBy = require('lodash/groupBy');

class Work extends Component {
  constructor() {
    super();

    this.state = {
      projectData: []
    }
  }

  componentDidMount() {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if(this.refs.workRef) {
          this.setState({
            projectData: data
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let { projectData } = this.state;
    let { margin } = this.props;

    return (
      <div id="work" className="row justify-content-center mx-0" style={{marginTop: margin}} ref="workRef">
          <div className="col-sm-10">
            <div className="container-fluid">
              <div className="row">
                <div className="card-columns card-columns-gap-3rem card-columns-gap-2rem card-columns-5 card-columns-2">
                  {projectData.map(project => {
                    let groupedImages = _groupBy(project.images, 'id');
                    let featureImageId = project.project_images_sort_order.images_order[1];
                    let featureImage = groupedImages[featureImageId][0];

                    return(
                      <div className="card line-height-1-25-rem border-0 d-inline-block mb-4" key={project.id}>
                      <Link
                        to={`${this.props.match.url}/${project.slug}`} >
                          <img
                            className="card-img-top img-fluid rounded-0"
                            src={ImageSizePicker.imgSize(featureImage.orig_name).w300}
                            alt={featureImage.alt} />
                      </Link>
                        <div className="card-block p-0 pt-3">
                          <p className="card-title mb-2">
                            <Link
                              to={`${this.props.match.url}/${project.slug}`}
                              className="text-muted">
                                {project.name}
                            </Link>
                          </p>
                        </div>
                      </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

module.exports = Work;