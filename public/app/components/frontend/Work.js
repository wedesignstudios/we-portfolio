import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Work extends Component {
  render() {
    let { margin } = this.props;
    return (
      <div id="work" style={{marginTop: margin}}>
        Inside Work Component!
      </div>
    );
  }
}

module.exports = Work;