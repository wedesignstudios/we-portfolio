import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormNewsStory from './FormNewsStory';

class CreateNewsStory extends React.Component {
  render() {
    return(
      <div>
        <FormNewsStory sendRequestType="POST" />
      </div>
    );
  }
}

export default CreateNewsStory;
