import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import FormHandlers from '../../services/form_handlers';
import DataActions from '../../data/actions';
import GetFeatureImageProjects from './GetFeatureImageProjects';
import GetImagesProjects from './GetImagesProjects';
import GetImagesNewsStory from './GetImagesNewsStory';
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

class ModalAddImages extends Component {
  constructor() {
    super();

    this.state = {
      openDropzone: false,
      imageAddSuccess: false,
      submitError: [],
      fileProcessing: false
    }

    this.getOpenCloseData = this.getOpenCloseData.bind(this);
    this.getImageData = this.getImageData.bind(this);
    this.imageAdded = this.imageAdded.bind(this);
    this.resetImageAdded = this.resetImageAdded.bind(this);
    this.resetFileProcessing = this.resetFileProcessing.bind(this);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clearModalErrs) {
      this.setState({submitError: []});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.submitError.length > prevState.submitError.length) {
      this.resetFileProcessing();
    }
  }

  onDrop(files) {
    console.log('onDrop: ', files);

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

  imageAdded(message) {
    if(message) {
      this.setState({imageAddSuccess: true});
    }
  }

  resetImageAdded() {
    this.setState({imageAddSuccess: false});
  }

  resetFileProcessing() {
    this.setState({fileProcessing: false});
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
    return(
      <div className="modal fade" id="addImages"tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-start">
              <h5 className="modal-title p-2">
                {this.props.parentForm === 'project-feature' ? 'Select Feature Image' : null}
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
                  resetImageAdded={this.resetImageAdded}
                  resetFileProcessing={this.resetFileProcessing} />
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
                  resetFileProcessing={this.resetFileProcessing}
                  addOrRemoveToAttachedFromSortArr = {this.props.addOrRemoveToAttachedFromSortArr} /> :
              null}
              {this.props.parentForm === 'newsStory' ?
                <GetImagesNewsStory
                  openDropzone={this.state.openDropzone}
                  sendOpenCloseData={this.getOpenCloseData}
                  sendImageDataToModal={this.props.sendImageData}
                  newsStoryId={this.props.newsStoryId}
                  imageAddSuccess={this.state.imageAddSuccess}
                  resetImageAdded={this.resetImageAdded}
                  resetFileProcessing={this.resetFileProcessing} /> :
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

export default ModalAddImages;
