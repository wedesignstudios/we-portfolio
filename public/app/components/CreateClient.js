import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CreateClient extends React.Component {
  render() {
    return (
      <div>
        <h3>Add A New Client</h3>
        <form>
          <div>
            <label>Client Name: </label>
            <input type="text" name="name" />
          </div>
          <div>
            <label>Website: </label>
            <input type="text" name="url" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = CreateClient;