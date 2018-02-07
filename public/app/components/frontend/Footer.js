import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Copyright = require('./Copyright');

class Footer extends Component {
  render() {
    return (
      <div id="footer" className="row justify-content-center m-0">
        <div className="col-lg-10 col-12 p-0 container-fluid height-100">
          <div className="row m-0 height-100 align-items-center">

            <div id="social-icons" className="col-lg-4 col-12 p-0">
              <div className="d-flex justify-content-center">
                <a href="https://instagram.com/wedesignstudios" target="_blank">
                  <i className="fab fa-instagram social-icon-circle mx-3" aria-hidden="true"></i>
                </a>
                <a href="https://www.facebook.com/WEDesignStudios" target="_blank">
                  <i className="fab fa-facebook-f social-icon-circle mx-3" aria-hidden="true"></i>
                </a>
                <a href="https://www.behance.net/WEDesignStudios" target="_blank">
                <i className="fab fa-behance social-icon-circle mx-3" aria-hidden="true"></i>
                </a>
              </div>
              <Copyright />
            </div>

            <div id="name-block" className="col-lg-4 col-12 p-0">
              <p className="text-center muli-bold h4 mb-3">
                WE DESIGN STUDIOS
              </p>
              <p className="text-center muli-bold h6 mb-4">
                AUSTIN, TX
              </p>
              <div id="squiggle" className="d-flex justify-content-center">
                <img src="https://we-portfolio.s3.amazonaws.com/footer-squiggle.svg" alt="squiggle line" />
              </div>
              <Copyright />
            </div>

            <div id="contact-us" className="col-lg-4 col-12 p-0">
              <div className="d-flex justify-content-center muli-bold h5 mb-0">
                <Link to="/contact">
                  <span className="contact-wave">
                    <span>C</span>
                    <span>O</span>
                    <span>N</span>
                    <span>T</span>
                    <span>A</span>
                    <span>C</span>
                    <span>T</span>
                    <span>&nbsp;</span>
                    <span>U</span>
                    <span>S</span>
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

module.exports = Footer;