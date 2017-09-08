import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';

class Contact extends Component {
  render() {
    let { margin } = this.props;
    return (
      <div id="contact" style={{marginTop: margin}}>
        Inside Contact Component!
        <Helmet>
          <title>Contact</title>
        </Helmet>
      </div>
    );
  }
}

module.exports = Contact;