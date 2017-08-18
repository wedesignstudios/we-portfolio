import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

class PressStory extends Component {
  render() {
    let { margin } = this.props;
    return(
      <div id="press-story" style={{marginTop: margin}}>
        Inside PressStory component!
      </div>
    );
  }
}

module.exports = PressStory;