import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormNewsStory from './FormNewsStory';

class UpdateNewsStory extends Component {
  render() {
    return(
      <div>
        <FormNewsStory sendRequestType="PUT" newsStoryId={this.props.match.params.id}/>
      </div>
    );
  }
}

export default UpdateNewsStory;
