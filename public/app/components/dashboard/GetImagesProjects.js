import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

const FormHandlers = require('../../services/form_handlers');
const DataActions = require('../../data/actions');

class GetImagesProjects extends React.Component {
  constructor() {
    super();

    this.state = {
      image_data: [],
      image_ids: [],
      image_added: false
    }

    this.imageAdded = this.imageAdded.bind(this);

  }

  onDrop(files) {
    files.forEach(file => {
      const formData = new FormData();

      formData.append('image', file);
      DataActions.uploadImages(
        formData,
        '/api/images/upload',
        this.imageAdded
      );
    });
  }

  imageAdded(message) {
    if(message) {
      this.setState({image_added: true});
    }
  }

  loadImages() {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(obj => {
          return obj.project_id === null || this.props.attached.includes(obj.id);
        });
        this.setState({
          image_data: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps) {
    console.log('Inside componentDidUpdate');
    if(this.state.image_added) {
      this.loadImages();
      this.setState({image_added: false});
    }

    if(prevProps.attached !== this.props.attached) {
      this.loadImages();
    }
  }

  selectedImage(imageObj) {
    if(this.props.toAttach.includes(imageObj.id) || this.props.attached.includes(imageObj.id) && !this.props.detach.includes(imageObj.id)) {
      return 'selected';
    } else {
      return '';
    }
  }

  render() {

    let dropzoneRef;

    return(
      <div id="get-images-projects">
      {this.props.openDropzone ?
          <Dropzone
            ref={(node) => {dropzoneRef = node}}
            name="images"
            accept="image/*"
            className="dropzone-styles"
            disableClick={true}
            onDrop={e => this.onDrop(e)}
          >
            <button
            id="close-dropzone"
              type="button"
              className="close"
              onClick={(e) => this.props.sendOpenCloseData(e)}>
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

        <div className="images-select-container">
        {this.state.image_data.map(image => {
          return <img
                    key={image.id}
                    id={image.id}
                    name="image_ids"
                    className={this.selectedImage(image)}
                    src={image.url}
                    height="100"
                    onClick={(e) => FormHandlers.multiSelect(e, this, this.props.sendImageDataToModal)} />
          })
        }

        </div>
    </div>
    )
  }
}

module.exports = GetImagesProjects;