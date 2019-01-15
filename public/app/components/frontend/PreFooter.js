import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const preFooterScript = require('../../../javascripts/canvasPreFooter');
const FormMailchimpSignUp = require('./FormMailchimpSignUp');

class PreFooter extends Component {
  render() {
    return (
      <div id="pre_footer" className="row justify-content-center m-0">
        <div id="pre_footer_overlay">
          <canvas id="canvas-pre-footer"></canvas>
        </div>
        <FormMailchimpSignUp />
      </div>
    )
  }
}

module.exports = PreFooter;