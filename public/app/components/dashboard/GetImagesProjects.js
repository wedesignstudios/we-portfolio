import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

class GetImagesProjects extends React.Component {
  constructor() {
    super();

    this.state = {
      imageData: [],
      imageId: null
    }

    this.dropzoneClickDisabled = false;
  }

  loadImages() {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(obj => {
          return obj.project_id === null;
        });

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
        '/api/images/upload'
      );
    });
  }

  selectImages(event, sendImageDataFunc) {
    const target = event.target;
    const selectedImageId = target.id
    const selectedImageUrl = target.src;

    this.setState({
      imageId: target.id
    });

    // sendImageDataFunc({id: selectedImageId, url: selectedImageUrl});
  }

  imageSelectCancel(event, sendImageIdFunc) {
    event.preventDefault();
    this.setState({
      imageId: ''
    });
    sendImageIdFunc({id: this.props.initialImageId, url: ''}, false);
  }

  componentDidMount() {
    this.loadImages();
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
        {this.state.imageData.map(image => {

          return <img
                    key={image.id}
                    id={image.id}
                    className={this.state.imageId == image.id ? 'selected' : ''}
                    src={image.url}
                    height="100"
                    onClick={(e) => this.selectImages(e, this.props.sendImageData)} />
          })
        }
      </div>
      {this.props.canCancel ?
        <div>
          <button onClick={(e) => this.imageSelectCancel(e, this.props.sendImageData)}>Cancel</button>
        </div> :
      null}
    </div>
    )
  }
}

module.exports = GetImagesProjects;