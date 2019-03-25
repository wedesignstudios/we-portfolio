import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Copyright extends Component {
  constructor() {
    super();

    this.today = new Date();
  }

  render() {
    return(
      <p className="text-center muli-bold h6 mb-0 mt-4 copyright">
        COPYRIGHT 2010-{this.today.getFullYear()}
      </p>
    )
  }
}

export default Copyright;
