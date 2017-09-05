import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

const FormHandlers = require('../../services/form_handlers');
const DataActions = require('../../data/actions');
const GetFeatureImageProjects = require('./GetFeatureImageProjects');
const GetImagesProjects = require('./GetImagesProjects');
const GetImagesNewsStory = require('./GetImagesNewsStory');

class ModalAddImages extends Component {
  constructor() {
    super();

    this.state = {
      openDropzone: false,
      imageAddSuccess: false,
      submitError: []
    }

    this.getOpenCloseData = this.getOpenCloseData.bind(this);
    this.getImageData = this.getImageData.bind(this);
    this.imageAdded = this.imageAdded.bind(this);
    this.resetImageAdded = this.resetImageAdded.bind(this);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clearModalErrs) {
      this.setState({submitError: []});
    }
  }

  onDrop(files) {
    files.forEach(file => {
      const formData = new FormData();

      formData.append('image', file);
      DataActions.uploadImages(
        formData,
        '/api/images/upload',
        this.imageAdded,
        this.setSubmitErrorMessage
      );
    });
  }

  imageAdded(message) {
    if(message) {
      this.setState({imageAddSuccess: true});
    }
  }

  resetImageAdded() {
    this.setState({imageAddSuccess: false});
  }

  openCloseDropZone() {
    this.setState({
      openDropzone: !this.state.openDropzone
    })
  }

  getOpenCloseData() {
    this.openCloseDropZone();
  }

  getImageData(data, targetName) {
    this.props.sendImageData(data, targetName);
  }

  render() {
    let dropzoneRef;
    return(
      <div className="modal fade" id="addImages"tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-start">
              <h5 className="modal-title p-2">
                {this.props.parentForm === 'project' ? 'Select Image(s)' : null}
                {this.props.parentForm === 'newsStory' ? 'Select Image' : null}
              </h5>
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

              {this.state.openDropzone ?
                <Dropzone
                  ref={(node) => {dropzoneRef = node}}
                  name="images"
                  accept="image/*"
                  className="dropzone-styles"
                  disableClick={true}
                  onDrop={e => this.onDrop(e)}>
                    <button
                      id="close-dropzone"
                      type="button"
                      className="close"
                      onClick={(e) => this.openCloseDropZone(e)}>
                        <span>&times;</span>
                    </button>
                    <h5>Drag image(s) here.</h5>
                    <p>or</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {dropzoneRef.open()}} >
                        Select Image(s)
                    </button>
                </Dropzone> :
              null}

              <div className="submit-message-error mt-3">
                {this.state.submitError.map((message, i) => {
                  return <div className="alert alert-danger" role="alert" key={i}>
                           {message}
                         </div>
                  })
                }
              </div>

              {this.props.parentForm === 'project-feature' ?
                <GetFeatureImageProjects
                  openDropzone={this.state.openDropzone}
                  sendOpenCloseData={this.getOpenCloseData}
                  projectId={this.props.projectId}
                  attached={this.props.attached}
                  sendImageDataToModal={this.props.sendImageData}
                  imageAddSuccess={this.state.imageAddSuccess}
                  resetImageAdded={this.resetImageAdded} />
              : null}
              {this.props.parentForm === 'project' ?
                <GetImagesProjects
                  openDropzone={this.state.openDropzone}
                  sendOpenCloseData={this.getOpenCloseData}
                  sendImageDataToModal={this.getImageData}
                  toAttachImgUrls={this.props.toAttachImgUrls}
                  attached={this.props.attached}
                  detach={this.props.detach}
                  toAttach={this.props.toAttach}
                  imageAddSuccess={this.state.imageAddSuccess}
                  resetImageAdded={this.resetImageAdded}
                  addOrRemoveToAttachedFromSortArr = {this.props.addOrRemoveToAttachedFromSortArr} /> :
              null}
              {this.props.parentForm === 'newsStory' ?
                <GetImagesNewsStory
                  openDropzone={this.state.openDropzone}
                  sendOpenCloseData={this.getOpenCloseData}
                  sendImageDataToModal={this.props.sendImageData}
                  newsStoryId={this.props.newsStoryId}
                  imageAddSuccess={this.state.imageAddSuccess}
                  resetImageAdded={this.resetImageAdded} /> :
              null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal">
                  OK
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = ModalAddImages;