import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';

const ImageSizePicker = require('../../services/image_size_picker');

class Contact extends Component {
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
    let { margin } = this.props;
    let { windowWidth } = this.state;
    let imageOrig = ImageSizePicker.imgOrig('LAURA_WEST_TX.jpg');
    let imageOrigMobile = ImageSizePicker.imgOrig('LAURA_WEST_TX_mobile.jpg');
    let imageSizes = ImageSizePicker.imgSize('LAURA_WEST_TX.jpg');
    let imageSizesMobile = ImageSizePicker.imgSize('LAURA_WEST_TX_mobile.jpg');
    return (
      <div id="contact" className="row mx-0 image-full-width" style={{marginTop: margin}}>
        <div
          id="contact-feature-image"
          className="col p-0 container image-full-width-container position-relative">
          {windowWidth > 800 ?
            <img
             className="img-fluid img-landscape"
             title=""
             alt=""
             src={imageOrig}
             srcSet=""
             sizes="100vw"
             width="2560" />
           : null}
           {windowWidth <= 800 ?
            <img
             className="img-portrait"
             title=""
             alt=""
             src={imageOrigMobile}
             srcSet=""
             sizes="100vw"
             width="1440" />
           : null}
          <div className="row mx-0 position-absolute text-overlay-container">
            <div className="col-12 p-0 container d-flex flex-column justify-content-between">
              <div id="cta-contact" className="row mx-0 mt-5">
                <div className="col-12 p-0">
                  <h1 className="text-center muli-extra-bold h1-jumbo letter-spacing-point3-rem">
                    SAY HELLO.
                  </h1>
                </div>
              </div>
              <div id="contact-email-addresses" className="row mx-0 text-center mb-5">
                <div className="col-xl-4 p-0 mb-xl-0 mb-4">
                  <h6 className="muli-extra-bold letter-spacing-point125-rem d-inline-block h6-underline pb-2 mb-sm-4">
                    DESIGN INQUIRIES
                  </h6>
                  <h5 className="muli-extra-bold letter-spacing-point125-rem">
                    LAURA@WEDESIGNSTUDIOS.COM
                  </h5>
                </div>
                <div className="col-xl-4 p-0 mb-xl-0 mb-4">
                  <h6 className="muli-extra-bold letter-spacing-point125-rem d-inline-block h6-underline pb-2 mb-sm-4">
                    GENERAL INQUIRIES
                  </h6>
                  <h5 className="muli-extra-bold letter-spacing-point125-rem">
                    INFO@WEDESIGNSTUDIOS.COM
                  </h5>
                </div>
                <div className="col-xl-4 p-0 mb-xl-0">
                  <h6 className="muli-extra-bold letter-spacing-point125-rem d-inline-block h6-underline pb-2 mb-sm-4">
                    DEVELOPMENT INQUIRIES
                  </h6>
                  <h5 className="muli-extra-bold letter-spacing-point125-rem">
                    DAVID@WEDESIGNSTUDIOS.COM
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Helmet>
          <title>Contact</title>
        </Helmet>
      </div>
    );
  }
}

module.exports = Contact;