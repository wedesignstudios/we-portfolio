import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import Scroll from 'react-scroll';
import {Helmet} from 'react-helmet';
import ImageSizePicker from '../../services/image_size_picker';
import DateFormatter from '../../services/date_formatter';

const scroll = Scroll.animateScroll;

class PressStory extends Component {
  constructor() {
    super();

    this.state = {
      newsData: [],
      windowWidth: 0
    }

    this.imageSizes;
    this.getWindowWidth = this.getWindowWidth.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/news-stories/${this.props.match.params.title}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          newsData: data
        })
      })
      .catch(err => {
        console.error(err);
      });
    this.getWindowWidth();
    window.addEventListener('resize', this.getWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowWidth);
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.newsData !== nextState.newsData) {
      this.imageSizes = ImageSizePicker.imgSize(nextState.newsData.image.orig_name);
    }
  }

  getWindowWidth() {
    this.setState({windowWidth: window.innerWidth});
  }

  scrollToTop() {
    scroll.scrollToTop({duration: 1000});
  }

  render() {
    let { newsData, windowWidth } = this.state,
        storyDate = new Date(newsData.date);

    if(this.state.newsData.length < 1) return null;
    return(
      <div id="press-story" className="row mx-0">
        <div
          id="press-feature-image"
          className="col-12 p-0 d-flex align-items-center feature-image">
          <img
            className="img-fluid"
            title={newsData.image.title}
            alt={newsData.image.alt}
            src={this.imageSizes.w300}
            srcSet={`${this.imageSizes.w300} 300w, ${this.imageSizes.w600} 600w, ${this.imageSizes.w800} 800w, ${this.imageSizes.w1024} 1024w, ${this.imageSizes.w1440} 1440w, ${newsData.image.url} 2560w`}
            sizes="100vw"
            width="2560" />
        </div>
        <div id="press-text" className="col-12 container p-0">
          <div className="row justify-content-center m-0">
            <div className="col-10 col-lg-8 col-xl-6 container p-0 mb-5rem mt-5">
              <h2 className="text-uppercase letter-spacing-point125-rem muli-bold">{newsData.title}</h2>
              <hr className="hr-point7rem mb-4" />
              <div className="row m-0">
                <div id="press-date" className="col-sm-6 p-0 pr-sm-3">
                  <h5 className="muli-bold m-0 mb-4 letter-spacing-point05-rem">{DateFormatter.monthYear(storyDate)}</h5>
                </div>
                <div className="col-sm-6 p-0 pl-sm-3">
                  <div className="white-space-pre-line" dangerouslySetInnerHTML={{__html: newsData.description}}></div>
                </div>
              </div>
              {windowWidth <= 768 ?
                <p className="text-center pt-4 muli-bold">
                  <span
                    className="back-to-top"
                    onClick={this.scrollToTop} >
                    BACK TO TOP
                  </span>
                </p>
              : null}
            </div>
          </div>
        </div>
        <Helmet>
          <title>{newsData.title}</title>
        </Helmet>
      </div>
    );
  }
}

export default PressStory;
