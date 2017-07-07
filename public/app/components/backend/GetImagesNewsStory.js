import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class GetImagesNewsStory extends React.Component {
  constructor() {
    super();

    this.state = {
      imageData: [],
      imageId: null      
    }
  }

  loadImages() {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(obj => {
          return obj.news_story_id === null;
        });

        this.setState({
          imageData: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  selectImage(event, sendImageDataFunc) {
    const target = event.target;
    const selectedImageId = target.id
    const selectedImageUrl = target.src;

    this.setState({
      imageId: target.id
    });

    sendImageDataFunc({id: selectedImageId, url: selectedImageUrl});
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
    return(
      <div id="get-images-news-story">        
        <div className="images-select-container">
        {this.state.imageData.map(image => {

          return <img 
                    key={image.id}                    
                    id={image.id}
                    className={this.state.imageId == image.id ? 'selected' : ''}
                    src={image.url} 
                    height="100"
                    onClick={(e) => this.selectImage(e, this.props.sendImageData)} />
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

module.exports = GetImagesNewsStory;