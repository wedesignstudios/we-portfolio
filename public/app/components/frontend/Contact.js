import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';

const ImageSizePicker = require('../../services/image_size_picker');

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      windowWidth: 0,
      videoOrImageLoaded: false
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

  setVideoOrImageLoaded() {
    this.setState({videoOrImageLoaded: true});
  }

  render() {
    let { margin } = this.props;
    let { windowWidth, videoOrImageLoaded } = this.state;
    let imageOrig = ImageSizePicker.imgOrig('HAND_ONLY.jpg');
    let imageOrigMobile = ImageSizePicker.imgOrig('HAND_ONLY_MOBILE.jpg');
    let imageSizes = ImageSizePicker.imgSize('HAND_ONLY.jpg');
    let imageSizesMobile = ImageSizePicker.imgSize('HAND_ONLY_MOBILE.jpg');
    let video = 'https://we-portfolio.s3.amazonaws.com/HAND_ONLY.mp4';
    return (
      <div id="contact" className="row mx-0 image-full-width" style={{marginTop: margin}}>
        <div
          id="contact-feature-image"
          className="col p-0 container image-full-width-container position-relative">
          {windowWidth > 800 ?
            <div className="video-container">
              <video
                id="contact-video"
                className="ipad-pro-video"
                width={windowWidth}
                src={video}
                playsInline
                autoPlay
                muted
                loop
                onCanPlay={(e) => this.setVideoOrImageLoaded(e)}>
              </video>
              <img
               className="img-portrait ipad-pro-poster-img-portrait ipad-pro-poster-img"
               title="Contact hand with googly eyes"
               alt="Contact hand with googly eyes"
               src={imageOrigMobile}
               srcSet={`${imageOrigMobile} 1440w, ${imageSizesMobile.w1024} 1024w, ${imageSizesMobile.w800} 800w, ${imageSizesMobile.w600} 600w,`}
               sizes="100vw"
               width="1440" />
             <img
              className="img-fluid img-landscape ipad-pro-poster-img-landscape"
              title="Contact hand with googly eyes"
              alt="Contact hand with googly eyes"
              src={imageOrig}
              srcSet={`${imageOrig} 1440w, ${imageSizes.w1024} 1024w, ${imageSizes.w800} 800w, ${imageSizes.w600} 600w,`}
              sizes="100vw"
              width="1440" />
            </div>
          : null}
          {windowWidth <= 800 ?
            <div className="img-container-mobile">
              <img
               className="img-portrait"
               title="Contact hand with googly eyes"
               alt="Contact hand with googly eyes"
               src={imageOrigMobile}
               srcSet={`${imageOrigMobile} 1440w, ${imageSizesMobile.w1024} 1024w, ${imageSizesMobile.w800} 800w, ${imageSizesMobile.w600} 600w,`}
               sizes="100vw"
               width="1440"
               onLoad={(e) => this.setVideoOrImageLoaded(e)} />
              <img
               id="img-landscape"
               className="img-fluid img-landscape"
               title="Contact hand with googly eyes"
               alt="Contact hand with googly eyes"
               src={imageOrig}
               srcSet={`${imageOrig} 1440w, ${imageSizes.w1024} 1024w, ${imageSizes.w800} 800w, ${imageSizes.w600} 600w,`}
               sizes="100vw"
               width="1440"
               onLoad={(e) => this.setVideoOrImageLoaded(e)} />
             </div>
          : null}
          <div className="row mx-0 position-absolute text-overlay-container">
            <div className="col-12 p-0 container d-flex flex-column justify-content-between">
              <div id="cta-contact" className="row mx-0 mt-5">
                <div className="col-12 p-0">
                {videoOrImageLoaded ?
                  <h1 className="text-center muli-extra-bold h1-jumbo letter-spacing-point3-rem">
                    SAY HELLO.
                  </h1>
                : null}
                </div>
              </div>
            </div>
          </div>
          <div id="contact-email-addresses" className="row mx-0 text-center mb-8rem mt-5rem">
            <h2 className="col-12 mb-5 text-uppercase letter-spacing-point125-rem muli-bold">
              <p>Let’s Get Started. Contact Us.</p>
            </h2>
            <div className="col-12 mb-sm-5rem mb-5">
              <h6 className="muli-extra-bold letter-spacing-point125-rem d-inline-block h6-underline pb-2 mb-4">
                DESIGN INQUIRIES
              </h6>
              <h5 className="muli-extra-bold letter-spacing-point125-rem">
                LAURA@WEDESIGNSTUDIOS.COM
              </h5>
            </div>
            <div className="col-12 mb-sm-5rem mb-5">
              <h6 className="muli-extra-bold letter-spacing-point125-rem d-inline-block h6-underline pb-2 mb-4">
                DEVELOPMENT INQUIRIES
              </h6>
              <h5 className="muli-extra-bold letter-spacing-point125-rem">
                DAVID@WEDESIGNSTUDIOS.COM
              </h5>
            </div>
            <div className="col-12">
              <h6 className="muli-extra-bold letter-spacing-point125-rem d-inline-block h6-underline pb-2 mb-4">
                GENERAL INQUIRIES
              </h6>
              <h5 className="muli-extra-bold letter-spacing-point125-rem">
                INFO@WEDESIGNSTUDIOS.COM
              </h5>
            </div>
          </div>
        </div>
        <Helmet>
          <title>Contact</title>
          <meta name="description" content="Contact us to start a design conversation about your project today." />
          <meta property="og:description" content="Contact us to start a design conversation about your project today." />
          <link rel="canonical" href={`https://wedesignstudios.com${this.props.match.url}`} />
          <meta property="og:url" content={`https://wedesignstudios.com${this.props.match.url}`} />
        </Helmet>
      </div>
    );
  }
}

module.exports = Contact;