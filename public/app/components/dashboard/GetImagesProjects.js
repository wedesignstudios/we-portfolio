import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

const FormHandlers = require('../../services/form_handlers');
const ImageSizePicker = require('../../services/image_size_picker');

class GetImagesProjects extends React.Component {
  constructor() {
    super();

    this.state = {
      image_data: [],
      image_ids: []
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
    if(this.props.imageAddSuccess && this.props.imageAddSuccess !== prevProps.imageAddSuccess) {
      this.loadImages();
      this.props.resetImageAdded();
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
    return(
      <div id="get-images-projects">
        <div className="images-select-container">
        {this.state.image_data.map(image => {
          let imgSizes = ImageSizePicker.imgSize(image.orig_name);
          return <img
                    key={image.id}
                    id={image.id}
                    name="image_ids"
                    className={this.selectedImage(image)}
                    src={imgSizes.w300}
                    height="100"
                    onClick={(e) => {this.props.addOrRemoveToAttachedFromSortArr(e), FormHandlers.multiSelect(e, this, this.props.sendImageDataToModal) } }
                    onError={(e) => e.target.setAttribute('src', image.url)} />
          })
        }
        </div>
      </div>
    )
  }
}

module.exports = GetImagesProjects;