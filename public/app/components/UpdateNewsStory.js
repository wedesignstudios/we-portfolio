import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormNewsStory = require('./FormNewsStory');

class UpdateNewsStory extends Component {
  render() {
    return(
      <div>
        <FormNewsStory sendRequestType="PUT" newsStoryId={this.props.match.params.id}/>
      </div>
    );
  }
}

module.exports = UpdateNewsStory;