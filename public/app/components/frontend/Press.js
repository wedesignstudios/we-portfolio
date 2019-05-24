import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import {Helmet} from 'react-helmet';
import ImageSizePicker from '../../services/image_size_picker';

class Press extends Component {
  constructor() {
    super();

    this.state = {
      newsData: [],
      cardMouseEnterId: false
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

  cardMouseEnter(event) {
    let cardId = event.target.id;
    this.setState({cardMouseEnterId: cardId});
  }

  cardMouseLeave() {
    this.setState({cardMouseEnterId: ''});
  }

  render() {
    let { newsData, cardMouseEnterId } = this.state;

    return (
      <div id="press" className="row justify-content-center mx-0" ref="pressRef">
        <div className="col-sm-10">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="card-columns">
                {newsData.map(story => {
                  let imageSizes = ImageSizePicker.imgSize(story.image.orig_name);
                  return(
                    <div key={story.id}>
                      <Link
                        to={`${this.props.match.url}/${story.slug}`} >
                        <div
                          id={story.id}
                          className="card line-height-1-25-rem border-0 d-inline-block mb-4"
                          onMouseEnter={(e) => this.cardMouseEnter(e)}
                          onMouseLeave={(e) => this.cardMouseLeave()}>
                            <img
                              className="card-img-top img-fluid rounded-0 p-2"
                              title={story.image.title}
                              alt={story.image.alt}
                              src={imageSizes.w300}
                              srcSet={`${imageSizes.w800} 800w, ${imageSizes.w600} 600w, ${imageSizes.w300} 300w`}
                              sizes="100vw"
                              width="300" />
                          <div className="card-block px-2 pb-3 pt-0">
                            <p className={cardMouseEnterId == story.id ? 'card-title m-0 muli-bold animate-underline' : 'card-title m-0 muli-bold'}>
                              {story.title}
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

export default Press;
