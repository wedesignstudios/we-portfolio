import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CreateClient extends React.Component {
  render() {
    return (
      <div>
        <h3>Add A New Client</h3>
        <form>
          <label>Client Name: </label>
          <input type="text" name="name" />
          <label>Website: </label>
          <input type="text" name="url" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

module.exports = CreateClient;