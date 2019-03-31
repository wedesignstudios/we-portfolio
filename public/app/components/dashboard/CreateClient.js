import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import FormClient from './FormClient';

class CreateClient extends React.Component {
  render() {
    return(
      <div>
        <FormClient sendRequestType="POST" />
      </div>
    );
  }
}

export default CreateClient;
