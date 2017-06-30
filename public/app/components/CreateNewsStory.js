import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormNewsStory = require('./FormNewsStory');

class CreateNewsStory extends React.Component {
  render() {
    return(
      <div>        
        <FormNewsStory sendRequestType="POST" />   
      </div>
    );
  }
}

module.exports = CreateNewsStory;