import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class GetNewsStories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsStoriesData: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: 'No message.'};
    }

    this.flashMessage = this.props.history.location.state.message;
  }

  componentDidMount() {
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

  componentWillUpdate(nextProps) {
    this.flashMessage = nextProps.history.location.state.message;
  }

  render() {
    return(
      <div>
        <p>Message: {this.flashMessage}</p>
        <Link to={`${this.props.match.url}/create`}>Add News Story</Link>
        <h3>All News Stories</h3>
          <div>
            {this.state.newsStoriesData.map(story =>
              <div key={story.id}><Link to={`${this.props.match.url}/${story.id}/update`}>{story.title}</Link></div>
            )}
          </div>
      </div>
    );
  }
}

module.exports = GetNewsStories;