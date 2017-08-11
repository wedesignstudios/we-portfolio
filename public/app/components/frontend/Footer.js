import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor() {
    super();

    this.today = new Date();
  }

  render() {
    return (
      <div id="footer" className="row justify-content-center m-0">
        <div className="col p-0">
          <div className="d-flex justify-content-center">&copy;2010-{this.today.getFullYear()} WE Design Studios LLC</div>
        </div>
      </div>
    )
  }
}

module.exports = Footer;