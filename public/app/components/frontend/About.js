import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class About extends Component {
  render() {
    let { margin } = this.props;
    return (
      <div id="about" style={{marginTop: margin}}>
        Inside About Component!
      </div>
    );
  }
}

module.exports = About;