import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Dropzone from 'react-dropzone';


const ModalUpdateImage = require('./ModalUpdateImage');
const FormValidations = require('../../services/form_validations');

class GetImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: [],
      imageId: null,
      openDropzone: false,
      submitError: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: '', messageError: []};
    }

    this.flashMessage = this.props.history.location.state.message;
    this.flashMessageError = this.props.history.location.state.messageError;

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

  openCloseDropZone() {
    this.setState({
      openDropzone: !this.state.openDropzone
    })
  }

  componentDidMount() {
    this.loadImages();
  }

  componentWillReceiveProps(nextProps) {
    this.loadImages();
  }

  componentWillUpdate(nextProps) {
    if(this.props.history.location.state !== undefined) {
      this.flashMessage = nextProps.history.location.state.message;
      this.flashMessageError = nextProps.history.location.state.messageError;

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
      <div className="row justify-content-center">
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

            <div className="errors row">
              <div className="col">
                {(this.flashMessageError && this.flashMessageError.length > 0) ?
                  this.flashMessageError.map((err, i) => {
                    return(
                      <div
                        key={i}
                        className="alert alert-danger"
                        role="alert">
                          {err}
                      </div>
                    )}) :
                null}
              </div>
            </div>

            {this.state.openDropzone ?
              <div className="errors row">
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