import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import ImageSizePicker from '../../services/image_size_picker';
import FormHandlers from '../../services/form_handlers';

class GetImagesProjects extends React.Component {
  constructor() {
    super();

    this.state = {
      image_data: [],
      image_ids: []
    }

  }

  loadImages() {
    fetch('/api/v1/images')
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(obj => {
          return (obj.project_id === null && Object.keys(obj.feature_image_project).length === 0) || this.props.attached.includes(obj.id);
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
      this.props.resetFileProcessing();
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
          let isSVG = /(.svg)$/g.test(image.orig_name);
          let imgSizes = ImageSizePicker.imgSize(image.orig_name);
          return <img
                    key={image.id}
                    id={image.id}
                    name="image_ids"
                    className={this.selectedImage(image)}
                    src={!isSVG ? imgSizes.w300 : image.url}
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

export default GetImagesProjects;
