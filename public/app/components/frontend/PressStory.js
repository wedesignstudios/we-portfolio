import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

const DateFormatter = require('../../services/date_formatter');

class PressStory extends Component {
  constructor() {
    super();

    this.state = {
      newsData: []
    }
  }

  componentDidMount() {
    fetch(`/api/news-stories/${this.props.match.params.title}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          newsData: data
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    let { newsData } = this.state;
    let { margin } = this.props;
    let storyDate = new Date(newsData.date);

    if(this.state.newsData.length < 1) return null;
    return(
      <div id="press-story" className="row mx-0" style={{marginTop: margin}}>
        <div
          id="press-feature-image"
          className="col-12 p-0 d-flex align-items-center">
          <img
            className="img-fluid"
            src={newsData.image.url}
            title={newsData.image.title}
            alt={newsData.image.alt} />
        </div>
        <div id="press-text" className="col-12 container p-0">
          <div className="row justify-content-center m-0">
            <div className="col-8 container p-0 mb-5rem mt-5">
              <h6 className="text-uppercase letter-spacing-point125-rem line-height-1-45-rem">{newsData.title}</h6>
              <hr className="hr-1rem" />
              <div className="row m-0">
                <div id="press-date" className="col-sm-6 p-0 pr-sm-3">
                  <p className="font-weight-bold">{DateFormatter.monthYear(storyDate)}</p>
                </div>
                <div className="col-sm-6 p-0 pl-sm-3">
                  <div className="white-space-pre-line">{newsData.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = PressStory;