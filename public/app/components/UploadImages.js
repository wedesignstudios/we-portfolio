import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

const DataActions = require('../data/actions');

class UploadImages extends React.Component {

  onDrop(files) {
    files.forEach(file => {
      const formData = new FormData();

      formData.append('image', file);
      DataActions.uploadImages(formData, '/api/images/upload');
    });
  }

  render() {
    return (
      <div>
        <h3>Upload Image(s)</h3>
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