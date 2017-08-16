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
        this.setState({
          newsData: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let { newsData } = this.state;
    let { margin } = this.props;
    margin = ((margin/16)+4.375)+'rem';
    console.log(newsData);
    return (
      <div id="press" className="row justify-content-center" style={{marginTop: margin}}>
        <div className="col-sm-10">
          <div className="row">
            {newsData.map(story => {
              return(
                <div className="col-sm-2 mb-4" key={story.id}>
                  <div className="card line-height-1-25-rem border-0">
                    <img
                      className="card-img-top img-fluid rounded-0"
                      src={story.image.url}
                      alt={story.image.alt} />
                    <div className="card-block p-0 pt-3">
                      <p className="card-title mb-2">
                        <Link
                          to={`${this.props.match.url}/${story.id}`}
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
    );
  }
}

module.exports = Press;