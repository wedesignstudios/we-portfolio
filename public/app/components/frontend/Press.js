import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Press extends Component {
  render() {
    let { margin } = this.props;
    return (
      <div id="press" style={{marginTop: margin}}>
        Inside Press Component!
      </div>
    );
  }
}

module.exports = Press;