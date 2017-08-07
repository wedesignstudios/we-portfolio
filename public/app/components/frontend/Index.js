import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Index extends Component {
  render() {
    return (
      <div className="row justify-content-center m-0 image-full-width">
        <div className="col p-0 image-full-width-container">
          <img className="img-fluid" src="https://we-portfolio.s3.amazonaws.com/LAURA_WEST_TX.jpg" alt="Laura out in West Texas" />
        </div>
        <div className="col p-0 image-full-width-text">
          <h5 className="muli-bold d-flex justify-content-center">WE DESIGN STUDIOS</h5>
        </div>
      </div>
    );
  }
}

module.exports = Index;