import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

class Press extends Component {
  constructor() {
    super();

    this.state = {
      newsData: []
    }
  }

  componentDidMount() {
    fetch('/api/news-stories')
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
    margin = ((margin/16)+4.375)+'rem';
    return (
      <div id="press" className="row justify-content-center mx-0" style={{marginTop: margin}} ref="pressRef">
        <div className="col-sm-10">
          <div className="container-fluid">
            <div className="row">
              <div className="card-columns card-columns-gap-3rem card-columns-gap-2rem card-columns-5 card-columns-2">
                {newsData.map(story => {
                  return(
                    <div className="mb-4" key={story.id}>
                      <div className="card line-height-1-25-rem border-0">
                      <Link
                        to={`${this.props.match.url}/${story.slug}`} >
                          <img
                            className="card-img-top img-fluid rounded-0"
                            src={story.image.url}
                            alt={story.image.alt} />
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

module.exports = Press;