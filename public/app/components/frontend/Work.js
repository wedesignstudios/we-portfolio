import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import {Helmet} from 'react-helmet';

const ImageSizePicker = require('../../services/image_size_picker');
const _groupBy = require('lodash/groupBy');

class Work extends Component {
  constructor() {
    super();

    this.state = {
      projectData: [],
      cardMousedOver: false
    }
  }

  componentDidMount() {
    fetch('/api/v1/projects')
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

  cardMouseOver() {
    this.setState({cardMousedOver: !this.state.cardMousedOver});
  }

  cardMouseOut() {
    this.setState({cardMousedOver: !this.state.cardMousedOver});
  }

  render() {
    let { projectData, cardMousedOver } = this.state;
    let { margin } = this.props;

    return (
      <div id="work" className="row justify-content-center mx-0" style={{marginTop: margin}} ref="workRef">
          <div className="col-sm-10">
            <div className="container-fluid">
              <div className="row">
                <div className="card-columns card-columns-gap-3rem card-columns-gap-2rem card-columns-5 card-columns-2">
                  {projectData.map(project => {
                    let groupedImages = _groupBy(project.images, 'id');
                    let featureImageId = project.project_images_sort_order.images_order[0];
                    let featureImage = groupedImages[featureImageId][0];
                    let featureImgSizes = ImageSizePicker.imgSize(featureImage.orig_name);

                    return(
                      <div key={project.id}>
                        <Link
                          to={`${this.props.match.url}/${project.slug}`} >
                          <div
                            className="card line-height-1-25-rem border-0 d-inline-block mb-4"
                            onMouseOver={(e) => this.cardMouseOver()}
                            onMouseOut={(e) => this.cardMouseOut()}>
                            <img
                              className="card-img-top img-fluid rounded-0 p-2"
                              src={featureImgSizes.w300}
                              srcSet={`${featureImgSizes.w800} 800w, ${featureImgSizes.w600} 600w, ${featureImgSizes.w450} 450w, ${featureImgSizes.w300} 300w`}
                              sizes="(min-width: 320px) 132px, 100vw"
                              width="300"
                              title={featureImage.title}
                              alt={featureImage.alt} />
                            <div className="card-block px-2 pb-3 pt-0">
                              <p className={cardMousedOver ? 'card-title m-0 muli-bold animate-underline' : 'card-title m-0 muli-bold'}>
                                {project.name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        <Helmet>
          <title>Work</title>
          <meta name="description" content="View our work creating visual identities, graphics, posters, logos, illustrations, apps and websites." />
          <meta property="og:description" content="View our work creating visual identities, graphics, posters, logos, illustrations, apps and websites." />
          <link rel="canonical" href={`https://wedesignstudios.com${this.props.match.url}`} />
          <meta property="og:url" content={`https://wedesignstudios.com${this.props.match.url}`} />
        </Helmet>
      </div>
    );
  }
}

module.exports = Work;