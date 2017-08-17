import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import 'whatwg-fetch';

const DataActions = require('../../data/actions');
const ModalUpdateImage = require('./ModalUpdateImage');
const FormValidations = require('../../services/form_validations');
const FormHandlers = require('../../services/form_handlers');

class GetImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: [],
      imageId: null,
      imageAddSuccess: false,
      openDropzone: false,
      submitError: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: ''};
    }

    this.flashMessage = this.props.history.location.state.message;
    this.imageAdded = this.imageAdded.bind(this);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  imageAdded(message) {
    if(message) {
      this.setState({imageAddSuccess: true});
    }
  }

  loadImages() {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          imageData: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
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

  openCloseDropZone() {
    this.setState({
      openDropzone: !this.state.openDropzone
    })
  }

  resetImageAdded() {
    this.setState({imageAddSuccess: false});
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.imageAddSuccess && this.state.imageAddSuccess !== prevState.imageAddSuccess) {
      this.loadImages();
      this.resetImageAdded();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.loadImages();
  }

  componentWillUpdate(nextProps) {
    if(this.props.history.location.state !== undefined) {
      this.flashMessage = nextProps.history.location.state.message;

      if(this.props.history.location.state.message !== '') {
        setTimeout(() => FormValidations.resetFlashMessage(this), 3000);
      }
    }
  }

  openUpdateImageModal(event) {
    event.preventDefault();
    this.setState({imageId: event.target.id});
    $(ReactDOM.findDOMNode(this.refs.modal)).modal();
  }

  render() {
    let dropzoneRef;
    return(
      <div className="row m-0 justify-content-center">
        <div className="col-sm-6">

          <ModalUpdateImage
            ref="modal"
            imageId={this.state.imageId}
            history={this.props.history} />

          <div className="container-fluid">
            <div className="row">
              <h2 className="font-weight-bold">All Images</h2>
              <button
                type="button"
                className="btn btn-primary ml-auto"
                onClick={(e) => this.openCloseDropZone(e)} >
                  Add New Image(s)
              </button>
            </div>
            <div className="row">
              <hr className="col" />
            </div>

            {this.flashMessage ?
              <div className="alert alert-success sticky-top">
                {this.flashMessage}
              </div> :
            null}

            {this.state.submitError.length > 0 ?
              <div className="errors row">
                <div className="col mb-4">
                  <div className="submit-message-error mt-3">
                    {this.state.submitError.map((message, i) => {
                      return (
                        <div
                          key={i}
                          className="alert alert-danger alert-dismissible"
                          role="alert">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                            {message}
                        </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div> :
            null}

            {this.state.openDropzone ?
              <div className="row">
                <div className="col mb-4">
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
                  </Dropzone>
                </div>
              </div> :
            null}

            <div className="row">
              {this.state.imageData.map((image) => {
                return(
                  <div className="col-sm-3 mb-4" key={image.id}>
                    <div className="card line-height-1-25-rem">
                      <img
                        id={image.id}
                        src={image.url}
                        title={image.title}
                        alt={image.alt}
                        width="100%"
                        onClick={(e) => this.openUpdateImageModal(e)} />

                        {image.project.name || image.news_story.title ?
                          <div className="card-footer text-muted px-3 py-1">
                            <div className="card-text mb-0">
                                {image.project.name ?
                                  <div>
                                  <small className="text-muted">
                                    <span className="font-weight-bold">Project:</span> {image.project.name}
                                  </small>
                                  </div> :
                                null}
                                {image.news_story.title ?
                                  <div>
                                  <small className="text-muted">
                                    <span className="font-weight-bold">News Story:</span> {image.news_story.title}
                                  </small>
                                  </div> :
                                null}
                            </div>
                          </div> :
                        null}
                    </div>
                  </div>
                )}
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = withRouter(GetImages);