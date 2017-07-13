import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const GetImagesProjects = require('./GetImagesProjects');

class ModalAddImages extends Component {
  constructor() {
    super();

    this.state = {
      openDropzone: false
    }

    this.getOpenCloseData = this.getOpenCloseData.bind(this);
  }

  openCloseDropZone() {
    this.setState({
      openDropzone: !this.state.openDropzone
    })
  }

  getOpenCloseData() {
    this.openCloseDropZone();
  }

  addImages(event) {
    event.preventDefault();
    console.log('this: ', this);
  }

  render() {
    return(
      <div className="modal fade" id="addImages"tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-start">
              <h5 className="modal-title p-2">Select Image(s)</h5>
              <button
                type="button"
                className="btn btn-primary p-2"
                onClick={(e) => this.openCloseDropZone(e)} >
                Add New
              </button>
              <button
                type="button"
                className="close ml-auto p-2"
                data-dismiss="modal"
                aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <GetImagesProjects
                openDropzone={this.state.openDropzone}
                sendOpenCloseData={this.getOpenCloseData} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal">
                  Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(e) => this.addImages(e)}>Add Image(s)</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = ModalAddImages;