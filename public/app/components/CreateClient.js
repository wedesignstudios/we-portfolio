import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const FormClient = require('./FormClient');

class CreateClient extends React.Component {
  render() {
    return(
      <div>        
        <FormClient sendRequestType="POST" />   
      </div>
    );
  }
}

module.exports = CreateClient;