import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

class GetImagesProjects extends React.Component {
  constructor() {
    super();

    this.state = {
      image_data: [],
      image_ids: []
    }

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

  loadImages() {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(obj => {
          return obj.project_id === null;
        });

        this.setState({
          image_data: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  selectImages(event, sendImageDataFunc) {
    const target = event.target;
    const selectedImageId = parseInt(target.id);
    const selectedImageUrl = target.src;
    var stateImageIdsArr = this.state.image_ids;

    if(stateImageIdsArr.includes(selectedImageId)) {
      let index = stateImageIdsArr.indexOf(selectedImageId);
      stateImageIdsArr.splice(index, 1);

      this.setState({
        image_ids: stateImageIdsArr
      });
    } else {
      this.setState({
        image_ids: this.state.image_ids.concat(selectedImageId)
      });
    }

    // sendImageDataFunc({imgId: selectedImageId, imgUrl: selectedImageUrl});
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
        {this.state.image_data.map(image => {
          return <img
                    key={image.id}
                    id={image.id}
                    className={this.state.image_ids.includes(image.id) ? 'selected' : ''}
                    src={image.url}
                    height="100"
                    onClick={(e) => this.selectImages(e, this.props.sendImageDataToModal)} />
          })
        }

        </div>
    </div>
    )
  }
}

module.exports = GetImagesProjects;