import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

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

    return(
      <div id="press-story" style={{marginTop: margin}}>
        Story: {newsData.title}
      </div>
    );
  }
}

module.exports = PressStory;