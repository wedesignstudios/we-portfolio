import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CreateCollaborator extends React.Component {
  render() {
    return (
      <div>
        <h3>Add A New Collaborator</h3>
        <form>
          <div>
            <label>Collaborator Name: </label>
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

module.exports = CreateCollaborator;