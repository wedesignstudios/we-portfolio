import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

const FormHandlers = require('../services/form_handlers');
const DataActions = require('../data/actions');

class UploadImages extends React.Component {
  constructor() {
    super();

    this.state = {
      success: false
    }
  }

  onDrop(files) {
    files.forEach(file => {
      const formData = new FormData();

      formData.append('image', file);
      DataActions.uploadImages(formData, '/api/images/upload', FormHandlers.successMessage(this));
    });
  }

  render() {
    return (
      <div>
        <h3>Upload Image(s)</h3>
        <div className="success">
          {this.state.success ? <div id="image-uploaded-success" style={{color: 'green'}}><p>Image(s) successfully uploaded.</p></div> : null}
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

module.exports = UploadImages;