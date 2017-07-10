import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const FormClient = require('./FormClient');

class UpdateClient extends Component {
  render() {
    return(
      <div>
        <FormClient sendRequestType="PUT" clientId={this.props.match.params.id} />
      </div>
    );
  }
}

module.exports = UpdateClient;