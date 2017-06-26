import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Dropzone from 'react-dropzone';

const FormHandlers = require('../services/form_handlers');
const DataActions = require('../data/actions');

class UploadImages extends React.Component {
  constructor() {
    super();

    this.state = {
      submitError: []
    }

    this.setRedirectWithMessage = FormHandlers.setRedirectWithMessage.bind(null, this, '/dashboard/images', this.state.submitError);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  onDrop(files) {
    files.forEach(file => {
      const formData = new FormData();

      formData.append('image', file);
      DataActions.uploadImages(
        formData,
        '/api/images/upload',
        this.setRedirectWithMessage,
        this.setSubmitErrorMessage
      );
    });
  }

  render() {
    return (
      <div>
        <Link to='/dashboard/images'>All Images</Link><br />
        <h3>Upload Image(s)</h3>
        <div className="submit-message-error" style={{color: 'red'}}>
          <ul>
          {this.state.submitError.map((message, i) => {
            return <li key={i}>{message}</li>
          })}
          </ul>
        </div>
        <Dropzone
          name="images"
          accept="image/*"
          onDrop={e => this.onDrop(e)}
        >
          <div>Drag image(s) here. Or click to select image(s) to upload.</div>
        </Dropzone>
      </div>
    );
  }
};

module.exports = withRouter(UploadImages);