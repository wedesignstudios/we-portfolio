import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CreateProject extends React.Component {
  render() {
    return (
      <div>
        <h3>Add A New Project</h3>
        <form>
          <label>Project Name: </label>
          <input type="text" name="name" />
          <label>Date Completed: </label>
          <input type="text" name="date" />
          <label>Description: </label>
          <input type="textfield" name="description" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

module.exports = CreateProject;