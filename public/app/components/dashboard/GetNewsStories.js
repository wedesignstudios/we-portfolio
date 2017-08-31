import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

const DateFormatter = require('../../services/date_formatter');
const FormValidations = require('../../services/form_validations');
const ImageSizePicker = require('../../services/image_size_picker');

class GetNewsStories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsStoriesData: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: ''};
    }

    this.flashMessage = this.props.history.location.state.message;
  }

  loadStories() {
    fetch('/api/news-stories')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          newsStoriesData: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.loadStories();
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
    if(prevState.newsStoriesData.length !== this.state.newsStoriesData.length) {
      this.loadStories();
    }
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-sm-6">

        <div className="container-fluid">
          <div className="row">
            <h2 className="font-weight-bold">All News Stories</h2>
            <Link to={`${this.props.match.url}/create`} className="btn btn-primary ml-auto">Add News Story</Link>
          </div>
          <div className="row">
            <hr className="col" />
          </div>

          {this.flashMessage ?
            <div className="alert alert-success">
              {this.flashMessage}
            </div> :
          null}

          <div className="row">
            {this.state.newsStoriesData.map(story => {
              let storyDate = new Date(story.date);
              let imgSize = ImageSizePicker.imgSize(story.image.orig_name);
              return (
                <div className="col-sm-2 mb-4" key={story.id}>
                  <div className="card line-height-1-25-rem">
                    <Link to={`${this.props.match.url}/${story.id}/update`}>
                      <img
                        className="card-img-top img-fluid"
                        src={imgSize.thumb300}
                        alt={story.image.alt}
                        width="300"
                        onError={(e) => e.target.setAttribute('src', image.url)} />
                    </Link>
                    <div className="card-block p-3">
                      <p className="card-title mb-2">
                        <Link to={`${this.props.match.url}/${story.id}/update`} className="text-muted">
                          {story.title}
                        </Link>
                      </p>
                    </div>
                    <div className="card-footer text-muted px-3 py-1">
                      <p className="card-text mb-0">
                        <small className="text-muted">
                          {DateFormatter.monthYear(storyDate)}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            )}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

module.exports = GetNewsStories;