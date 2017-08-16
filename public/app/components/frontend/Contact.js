import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Contact extends Component {
  render() {
    let { margin } = this.props;
    return (
      <div id="contact" style={{marginTop: margin}}>
        Inside Contact Component!
      </div>
    );
  }
}

module.exports = Contact;