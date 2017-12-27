import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroll from 'react-scroll';
import {Helmet} from 'react-helmet';

const scroll = Scroll.animateScroll;
const ImageSizePicker = require('../../services/image_size_picker');

class About extends Component {
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

  scrollToTop() {
    scroll.scrollToTop({duration: 1000});
  }

  render() {
    let { margin } = this.props;
    let { windowWidth } = this.state;
    let imageOrig = ImageSizePicker.imgOrig('WE_TWIRL.jpg');
    let imageSizes = ImageSizePicker.imgSize('WE_TWIRL.jpg');
    let lauraImageOrig = ImageSizePicker.imgOrig('LAURA_HEADSHOT.jpg');
    let lauraImageSizes = ImageSizePicker.imgSize('LAURA_HEADSHOT.jpg');
    let lauraGifOrig = ImageSizePicker.imgOrig('LAURA_HEADSHOT_GIF_V3.gif');
    let lauraGifSizes = ImageSizePicker.imgSize('LAURA_HEADSHOT_GIF_V3.gif');
    let davidImageOrig = ImageSizePicker.imgOrig('DAVID_HEADSHOT.jpg');
    let davidImageSizes = ImageSizePicker.imgSize('DAVID_HEADSHOT.jpg');
    let davidGifOrig = ImageSizePicker.imgOrig('DAVID_HEADSHOT_GIF_V2.gif');
    let davidGifSizes = ImageSizePicker.imgSize('DAVID_HEADSHOT_GIF_V2.gif');
    let lemmyImageOrig = ImageSizePicker.imgOrig('LEMMY_HEADSHOT.jpg');
    let lemmyImageSizes = ImageSizePicker.imgSize('LEMMY_HEADSHOT.jpg');
    let lemmyGifOrig = ImageSizePicker.imgOrig('LEMMY_HEADSHOT_GIF_V2.gif');
    let lemmyGifSizes = ImageSizePicker.imgSize('LEMMY_HEADSHOT_GIF_V2.gif');
    let video = 'https://we-portfolio.s3.amazonaws.com/WE_TWIRL.mp4';
    return (
      <div id="about" className="row mx-0" style={{marginTop: margin}}>
        <div
          id="about-feature-image"
          className="col-12 p-0 container image-full-width-container">
          {windowWidth > 800 ?
            <div>
              <video id="about-video" className="ipad-pro-video" poster={imageOrig} playsInline autoPlay muted loop>
                <source src={video} type="video/mp4" />
              </video>
            </div>
          : null}
          {windowWidth <= 800 ?
            <div>
              <img
               className="img-fluid"
               title="WE letters"
               alt="WE letters"
               src={imageOrig}
               srcSet={`${imageOrig} 1440w, ${imageSizes.w1024} 1024w, ${imageSizes.w800} 800w, ${imageSizes.w600} 600w,`}
               sizes="100vw"
               width="1440" />
            </div>
          : null}
        </div>
        <div id="about-content" className="col-12 p-0 container">
          <div className="row justify-content-center m-0">
            <div className="col-10 col-lg-8 col-xl-6 container p-0 mb-2rem mt-5">
              <h2 className="text-uppercase letter-spacing-point125-rem muli-bold">WHO WE ARE</h2>
              <hr className="hr-point7rem mb-4" />
              <p>WE Design Studios is an Austin-based design and development duo run by Laura Worrick and David Elden. Their curiosity has brought them around the world where they’ve been able to learn, play, explore & educate. The team’s thoughtful design is informed by their multidisciplinary backgrounds and playful nature. They are commited to community and have provided design resources and management for various projects in collaboration with IBM Design, AIGA and Create-A-Thon.</p>

              <p>WE specializes in brand identities, software development, print design, web design, illustration & more.</p>

              <p>Start a Project ></p>

              <div className="row justify-content-center m-0 mt-6rem">
                <div className="col-sm-6 pl-sm-0 about-profile">
                  <img
                    className="headshot"
                    title="Laura Worrick headshot"
                    alt="Laura Worrick headshot"
                    src={lauraImageOrig}
                    srcSet={`${lauraImageOrig} 1440w, ${lauraImageSizes.w1024} 1024w, ${lauraImageSizes.w800} 800w, ${lauraImageSizes.w600} 600w,`}
                    sizes="100vw"
                    width="100%" />
                  <img
                    className="headshot headshot-animated-gif pr-md-3"
                    title="Laura Worrick headshot animated gif"
                    alt="Laura Worrick headshot animated gif"
                    src={lauraGifOrig}
                    srcSet={`${lauraGifOrig} 1440w, ${lauraGifSizes.w1024} 1024w, ${lauraGifSizes.w800} 800w, ${lauraGifSizes.w600} 600w,`}
                    sizes="100vw"
                    width="100%" />
                </div>
                <div className="col-sm-6 pr-sm-0 about-profile order-1">
                  <h5 className="muli-bold m-0 letter-spacing-point05-rem">LAURA WORRICK</h5>
                  <hr className="hr-point7rem mb-4" />
                  <p>Laura is an art director, designer and illustrator.</p>
                </div>
              </div>
              <div className="row justify-content-center m-0 mt-6rem">
                <div className="col-sm-6 pl-sm-0 about-profile">
                  <h5 className="muli-bold m-0 letter-spacing-point05-rem">DAVID ELDEN</h5>
                  <hr className="hr-point7rem mb-4" />
                  <p>David is a software developer, designer and operations manager.</p>
                </div>
                <div className="col-sm-6 pr-sm-0 about-profile">
                  <img
                    className="headshot"
                    title="David Elden headshot"
                    alt="David Elden headshot"
                    src={davidImageOrig}
                    srcSet={`${davidImageOrig} 1440w, ${davidImageSizes.w1024} 1024w, ${davidImageSizes.w800} 800w, ${davidImageSizes.w600} 600w,`}
                    sizes="100vw"
                    width="100%" />
                  <img
                    className="headshot headshot-animated-gif pl-md-3"
                    title="David Elden headshot animated gif"
                    alt="David Elden headshot animated gif"
                    src={davidGifOrig}
                    srcSet={`${davidGifOrig} 1440w, ${davidGifSizes.w1024} 1024w, ${davidGifSizes.w800} 800w, ${davidGifSizes.w600} 600w,`}
                    sizes="100vw"
                    width="100%" />
                </div>
              </div>
              <div className="row justify-content-center m-0 mt-6rem">
                <div className="col-sm-6 pl-sm-0 about-profile">
                  <img
                    className="headshot"
                    title="Lemmy headshot"
                    alt="Lemmy headshot"
                    src={lemmyImageOrig}
                    srcSet={`${lemmyImageOrig} 1440w, ${lemmyImageSizes.w1024} 1024w, ${lemmyImageSizes.w800} 800w, ${lemmyImageSizes.w600} 600w,`}
                    sizes="100vw"
                    width="100%" />
                  <img
                    className="headshot headshot-animated-gif pr-md-3"
                    title="Lemmy headshot animated gif"
                    alt="Lemmy headshot animated gif"
                    src={lemmyGifOrig}
                    srcSet={`${lemmyGifOrig} 1440w, ${lemmyGifSizes.w1024} 1024w, ${lemmyGifSizes.w800} 800w, ${lemmyGifSizes.w600} 600w,`}
                    sizes="100vw"
                    width="100%" />
                </div>
                <div className="col-sm-6 pr-sm-0 about-profile order-1">
                  <h5 className="muli-bold m-0 letter-spacing-point05-rem">LEMMY</h5>
                  <hr className="hr-point7rem mb-4" />
                  <p>Office manager, Pug-zhu and sleep expert. Bork!</p>
                </div>
              </div>
              <div className="mb-5 mt-6rem">
                <h5 className="muli-bold m-0 letter-spacing-point05-rem">SELECT CLIENTS</h5>
                <hr className="hr-point7rem mb-4" />
                <p>United Nations, Who What Wear, AIGA Austin, International Crisis Group, Thomson Reuters, Rhode Island School of Design, Mount Holyoke College, Lady Bird Johnson Wild Flower Center, Handmade in the Heartland, The Hutong Beijing.</p>
              </div>
              <p className="text-center pt-4 muli-bold">
                <span
                  className="back-to-top"
                  onClick={this.scrollToTop} >
                  BACK TO TOP
                </span>
              </p>
            </div>
          </div>
        </div>
        <Helmet>
          <title>About</title>
          <meta name="description" content="Learn about the creative WE team and our expertise in design and development." />
          <meta property="og:description" content="Learn about the creative WE team and our expertise in design and development." />
          <link rel="canonical" href={`https://wedesignstudios.com${this.props.match.url}`} />
          <meta property="og:url" content={`https://wedesignstudios.com${this.props.match.url}`} />
        </Helmet>
      </div>
    );
  }
}

module.exports = About;