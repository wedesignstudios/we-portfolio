import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormNewsStory = require('./FormNewsStory');

class UpdateNewsStory extends Component {
  render() {
    return(
      <div>
        <FormNewsStory sendRequestType="PUT" />
      </div>
    );
  }
}

module.exports = UpdateNewsStory;