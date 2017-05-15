import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const UploadImages = require('./UploadImages');

class GetImages extends React.Component {
  constructor() {
    super();

    this.state = {
      imageData: []
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

  render() {
    return(
      <div>
        <h3>Get All Images</h3>
        <div className="image-grid">
          {this.state.imageData.map(image =>
            <div key={image.id} className="image-grid-element">
              <img src={image.url} title={image.title} alt={image.alt} width="100%" />
            </div>
          )}
        </div>
      </div>
    );
  }
};

module.exports = GetImages;