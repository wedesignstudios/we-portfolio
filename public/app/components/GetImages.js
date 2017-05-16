import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const UpdateImage = require('./UpdateImage');

class GetImages extends React.Component {
  constructor() {
    super();

    this.state = {
      imageData: [],
      imageId: null,
      isUpdateImageOpen: false
    };

  }

  componentDidMount() {
    fetch('/images')
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

  openUpdateImage(event, imageId) {
    this.setState({
      imageId: imageId,
      isUpdateImageOpen: !this.state.isUpdateImageOpen
    });
  }

  closeUpdateImage(e) {
    this.setState({
      isUpdateImageOpen: !this.state.isUpdateImageOpen
    });
  }

  render() {
    return(
      <div>
        <h3>Get All Images</h3>
        <div className="image-grid">
          {this.state.imageData.map(image =>
            <div key={image.id} className="image-grid-element">
              <img
                src={image.url}
                title={image.title}
                alt={image.alt}
                width="100%"
                onClick={(e) => this.openUpdateImage(e, image.id)} />
            </div>
          )}
        </div>
        {this.state.isUpdateImageOpen ? <UpdateImage imageId={this.state.imageId} isOpen={this.state.isUpdateImageOpen} onClose={(e) => this.closeUpdateImage(e)} /> : null}
      </div>
    );
  }
};

module.exports = GetImages;