import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const ImageSizePicker = require('../../services/image_size_picker');

class Index extends Component {
  constructor() {
    super();

    this.state = {
      windowWidth: 0
    }

    this.getWindowWidth = this.getWindowWidth.bind(this);
  }

  componentDidMount() {
    this.getWindowWidth();
    window.addEventListener('resize', this.getWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowWidth);
  }

  getWindowWidth() {
    this.setState({windowWidth: window.innerWidth});
  }

  render() {
    let { windowWidth } = this.state;
    let imageOrig = ImageSizePicker.imgOrig('HOMEPAGE_IMAGE_DESKTOP.jpg');
    let imageOrigMobile = ImageSizePicker.imgOrig('HOMEPAGE_IMAGE_MOBILE.jpg');
    let imageSizes = ImageSizePicker.imgSize('HOMEPAGE_IMAGE_DESKTOP.jpg');
    let imageSizesMobile = ImageSizePicker.imgSize('HOMEPAGE_IMAGE_MOBILE.jpg');

    return (
      <div className="row justify-content-center m-0 image-full-width">
        <div className="col p-0 image-full-width-container">
          {windowWidth > 1024 ?
            <img
              className="img-fluid img-landscape"
              alt="WE paper mache heads"
              src={imageOrig}
              srcSet={`${imageOrig} 2560w, ${imageSizes.w1440} 1440w, ${imageSizes.w1024} 1024w`}
              sizes="100vw"
              width="2560" />
          : null}
          {windowWidth <= 1024 ?
            <img
              className="img-portrait"
              alt="WE paper mache heads"
              src={imageOrigMobile}
              srcSet={`${imageOrigMobile} 1440w, ${imageSizesMobile.w1024} 1024w, ${imageSizesMobile.w800} 800w, ${imageSizesMobile.w600} 600w,`}
              sizes="100vw"
              width="1440" />
          : null}
        </div>
      </div>
    );
  }
}

module.exports = Index;