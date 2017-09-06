import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;
const ImageSizePicker = require('../../services/image_size_picker');

class About extends Component {

  scrollToTop() {
    scroll.scrollToTop({duration: 1000});
  }

  render() {
    let { margin } = this.props;
    return (
      <div id="about" className="row mx-0" style={{marginTop: margin}}>
        <div
          id="about-feature-image"
          className="col-12 p-0  p-0 d-flex align-items-center feature-image">
            <img
             className="img-fluid"
             title=""
             alt=""
             src="https://we-portfolio.s3.amazonaws.com/IMG_0588.JPG"
             srcSet=""
             sizes="100vw"
             width="2560" />
        </div>
        <div id="about-content" className="col-12 p-0 container">
          <div className="row justify-content-center m-0">
            <div className="col-8 container p-0 mb-5rem mt-5">
              <h6 className="text-uppercase letter-spacing-point125-rem line-height-1-45-rem">WHO WE ARE</h6>
              <hr className="hr-1rem" />
              <p>WE Design Studios is an Austin-based design and development duo run by Laura Worrick and David Elden. Their curiosity has brought them around the world where they’ve been able to learn, play, explore & educate. The team’s thoughtful design is informed by their multidisciplinary backgrounds and playful nature. They are commited to community and have provided design resources and management for various projects in collaboration with IBM Design, AIGA and Create-A-Thon.</p>

              <p>WE specializes in brand identities, software development, print design, web design, illustration & more.</p>

              <p>Start a Project ></p>

              <div className="row justify-content-center m-0 mt-6rem">
                <div className="col-sm-6 pl-sm-0 about-profile">
                  <img
                    className="headshot"
                    title=""
                    alt=""
                    src="https://we-portfolio.s3.amazonaws.com/WE-Headshot-Placeholder.png"
                    srcSet=""
                    sizes="100vw"
                    width="100%" />
                </div>
                <div className="col-sm-6 pr-sm-0 about-profile order-1">
                  <h6 className="text-uppercase letter-spacing-point125-rem line-height-1-45-rem">LAURA WORRICK</h6>
                  <hr className="hr-1rem" />
                  <p>Laura is an art director, designer and illustrator.</p>
                </div>
              </div>
              <div className="row justify-content-center m-0 mt-6rem">
                <div className="col-sm-6 pl-sm-0 about-profile">
                  <h6 className="text-uppercase letter-spacing-point125-rem line-height-1-45-rem">DAVID ELDEN</h6>
                  <hr className="hr-1rem" />
                  <p>David is a software developer, designer and operations manager.</p>
                </div>
                <div className="col-sm-6 pr-sm-0 about-profile">
                  <img
                    className="headshot"
                    title=""
                    alt=""
                    src="https://we-portfolio.s3.amazonaws.com/WE-Headshot-Placeholder.png"
                    srcSet=""
                    sizes="100vw"
                    width="100%" />
                </div>
              </div>
              <div className="row justify-content-center m-0 mb-5 mt-6rem">
                <div className="col-sm-6 pl-sm-0 about-profile">
                  <img
                    className="headshot"
                    title=""
                    alt=""
                    src="https://we-portfolio.s3.amazonaws.com/WE-Headshot-Placeholder.png"
                    srcSet=""
                    sizes="100vw"
                    width="100%" />
                </div>
                <div className="col-sm-6 pr-sm-0 about-profile order-1">
                  <h6 className="text-uppercase letter-spacing-point125-rem line-height-1-45-rem">LEMMY</h6>
                  <hr className="hr-1rem" />
                  <p>Office manager, Pug-zhu and sleep expert. Bork!</p>
                </div>
              </div>
              <p className="text-center pt-4">
                <span
                  style={{cursor: 'pointer'}}
                  onClick={this.scrollToTop} >
                  BACK TO TOP
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = About;