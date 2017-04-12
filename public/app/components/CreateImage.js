import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CreateImage extends React.Component {
  render() {
    return (
      <div>
        <h3>Add A New Image</h3>
        <form>
          <div>
            <label>Image Title: </label>
            <input type="text" name="title" />
          </div>
          <div>
            <label>Alt Tag: </label>
            <input type="text" name="alt" />
          </div>
          <div>
            <label>Image URL: </label>
            <input type="text" name="url" />
            <input type="hidden" name="project_id" />
          </div>
          <div>
            <label>Use this image on index page?: </label>
            <input type="checkbox" name="index_page" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = CreateImage;