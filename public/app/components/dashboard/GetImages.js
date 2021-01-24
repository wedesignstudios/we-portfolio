import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import ImageSizePicker from '../../services/image_size_picker';
import FormHandlers from '../../services/form_handlers';
import DataActions from '../../data/actions';
import ModalUpdateImage from './ModalUpdateImage';
import FormValidations from '../../services/form_validations';
import Spinner from '../spinner/Spinner.js';

const dropzoneRef = createRef(),
      baseStyle = {
        alignItems: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'gray',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        width: '100%'
      };

class GetImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: [],
      imageId: null,
      imageAddSuccess: false,
      openDropzone: false,
      submitError: [],
      fileProcessing: false
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
    fetch('/api/v1/images')
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
    let uploadPath = '/api/v1/images/upload';

    this.setState({
      fileProcessing: true
    });

    files.forEach(file => {
      const formData = new FormData();
      formData.append('image', file);

      if(file.type === 'image/gif') {
        uploadPath = '/api/v1/images/upload/gif'
      }

      DataActions.uploadImages(
        formData,
        uploadPath,
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

  resetFileProcessing() {
    this.setState({fileProcessing: false});
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.imageAddSuccess && this.state.imageAddSuccess !== prevState.imageAddSuccess) {
      this.loadImages();
      this.resetFileProcessing();
      this.resetImageAdded();
    }
    if(this.state.submitError.length > prevState.submitError.length) {
      this.resetFileProcessing();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.loadImages();
  }

  componentWillUpdate(nextProps, nextState) {
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
    return(
      <div className="row m-0 justify-content-center">
        <div className="col-sm-9">

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
                  ref={dropzoneRef}
                  onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({
                        accept: 'image/*',
                        onClick: e => { e.preventDefault(); e.stopPropagation(); },
                        onKeyDown: e => {
                          if (e.keyCode === 32 || e.keyCode === 13) {
                            e.stopPropagation();
                          }
                        },
                        style: baseStyle
                      })
                    }>
                      <input {...getInputProps()} />
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
                        id="open-dropzone-select"
                        type="button"
                        className="btn btn-secondary"
                        onClick={ dropzoneRef.current ? dropzoneRef.current.open : null } >
                          Select Image(s)
                      </button>
                    </div>
                  )}
                </Dropzone>
                </div>
              </div> :
            null}

            <div className="row">
              {this.state.imageData.map((image) => {
                let isSVG = /(.svg)$/g.test(image.orig_name);
                let imgSizes = ImageSizePicker.imgSize(image.orig_name);

                return(
                  <div className="col-sm-3 mb-4" key={image.id}>
                    <div className="card line-height-1-25-rem">
                      <img
                        id={image.id}
                        src={isSVG ? image.url : imgSizes.w300}
                        title={image.title}
                        alt={image.alt}
                        width="300"
                        onClick={(e) => this.openUpdateImageModal(e)}
                        onError={(e) => e.target.setAttribute('src', image.url)} />

                        {image.project_id || image.news_story_id || image.feature_image_project.id ?
                          <div className="card-footer text-muted px-3 py-1">
                            <div className="card-text mb-0">
                                {image.feature_image_project.id ?
                                  <div>
                                    <small className="text-muted">
                                      <span className="font-weight-bold">Feature Image:</span> {image.feature_image_project.project.name}
                                    </small>
                                  </div> :
                                null}
                                {image.project_id ?
                                  <div>
                                  <small className="text-muted">
                                    <span className="font-weight-bold">Project:</span> {image.project.name}
                                  </small>
                                  </div> :
                                null}
                                {image.news_story_id ?
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

export default withRouter(GetImages);
