import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CreateImage extends React.Component {
  render() {
    return (
      <div>
        <h3>Add A New Image</h3>
        <form>
          <label>Image Title: </label>
          <input type="text" name="title" />
          <label>Alt Tag: </label>
          <input type="text" name="alt" />
          <label>Image URL: </label>
          <input type="text" name="url" />          
          <input type="hidden" name="project_id" />
          <label>Use this image on index page?: </label>
          <input type="checkbox" name="index_page" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

module.exports = CreateImage;