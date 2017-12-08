import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import {Helmet} from 'react-helmet';

const ImageSizePicker = require('../../services/image_size_picker');

class Press extends Component {
  constructor() {
    super();

    this.state = {
      newsData: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/news-stories')
      .then(res => res.json())
      .then(data => {
        if(this.refs.pressRef) {
          this.setState({
            newsData: data
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let { newsData } = this.state;
    let { margin } = this.props;

    return (
      <div id="press" className="row justify-content-center mx-0" style={{marginTop: margin}} ref="pressRef">
        <div className="col-sm-10">
          <div className="container-fluid">
            <div className="row">
              <div className="card-columns card-columns-gap-3rem card-columns-gap-2rem card-columns-5 card-columns-2">
                {newsData.map(story => {
                  let imageSizes = ImageSizePicker.imgSize(story.image.orig_name);
                  return(
                    <div className="card line-height-1-25-rem border-0 d-inline-block mb-4" key={story.id}>
                    <Link
                      to={`${this.props.match.url}/${story.slug}`} >
                        <img
                          className="card-img-top img-fluid rounded-0"
                          title={story.image.title}
                          alt={story.image.alt}
                          src={imageSizes.w300}
                          srcSet={`${imageSizes.w800} 800w, ${imageSizes.w600} 600w, ${imageSizes.w300} 300w`}
                          sizes="100vw"
                          width="300" />
                    </Link>
                      <div className="card-block p-0 pt-3">
                        <p className="card-title mb-2">
                          <Link
                            to={`${this.props.match.url}/${story.slug}`}
                            className="text-muted">
                              {story.title}
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
        <Helmet>
          <title>Press</title>
          <meta name="description" content="Read press releases, feature articles and media mentions about our studio." />
          <meta property="og:description" content="Read press releases, feature articles and media mentions about our studio." />
          <link rel="canonical" href={`https://wedesignstudios.com${this.props.match.url}`} />
          <meta property="og:url" content={`https://wedesignstudios.com${this.props.match.url}`} />
        </Helmet>
      </div>
    );
  }
}

module.exports = Press;