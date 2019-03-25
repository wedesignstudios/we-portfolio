import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import FormClient from './FormClient';

class UpdateClient extends Component {
  render() {
    return(
      <div>
        <FormClient sendRequestType="PUT" clientId={this.props.match.params.id} />
      </div>
    );
  }
}

export default UpdateClient;
