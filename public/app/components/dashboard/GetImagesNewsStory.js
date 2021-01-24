import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ImageSizePicker from '../../services/image_size_picker';

class GetImagesNewsStory extends React.Component {
  constructor() {
    super();

    this.state = {
      image_data: [],
      image_id: null
    }
  }

  loadImages() {
    fetch('/api/v1/images')
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(obj => {
          return obj.news_story_id === null || obj.news_story_id == this.props.newsStoryId;
        });
        this.setState({
          image_data: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setImageId(imageData) {
    let image = imageData.filter(img => {
      return img.news_story_id == this.props.newsStoryId;
    });

    if(image.length > 0) {
      this.setState({
        image_id: image[0].id
      });
    }
  }

  selectImage(event, sendImageDataFunc) {
    const target = event.target;
    const selectedImageId = target.id
    const selectedImageUrl = target.src;

    this.setState({
      image_id: target.id
    });

    sendImageDataFunc({id: selectedImageId, url: selectedImageUrl});
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

    if(this.state.image_id === null && this.props.newsStoryId) {
      this.setImageId(this.state.image_data);
    }
  }

  render() {
    return(
      <div id="get-images-news-story">
        <div className="images-select-container">
        {this.state.image_data.map(image => {
          let isSVG = /(.svg)$/g.test(image.orig_name);
          let imgSizes = ImageSizePicker.imgSize(image.orig_name);
          return <img
                    key={image.id}
                    id={image.id}
                    className={this.state.image_id == image.id ? 'selected' : ''}
                    src={!isSVG ? imgSizes.w300 : image.url}
                    height="100"
                    onClick={(e) => this.selectImage(e, this.props.sendImageDataToModal)}
                    onError={(e) => e.target.setAttribute('src', image.url)} />
          })
        }
      </div>
    </div>
    )
  }
}

export default GetImagesNewsStory;
