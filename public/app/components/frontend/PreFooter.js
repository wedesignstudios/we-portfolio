import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormMailchimpSignUp = require('./FormMailchimpSignUp');

class PreFooter extends Component {
  render() {
    return (
      <div id="pre_footer" className="row justify-content-center m-0">
        <div id="pre_footer_overlay"></div>
        <FormMailchimpSignUp />
      </div>
    )
  }
}

module.exports = PreFooter;