import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UpdateImage extends React.Component {

  constructor() {
    super();

    this.state = {
      title: '',
      alt: '',
      url: '',
      index_page: false
    }
  }

  componentDidMount() {
    fetch(`/images/${this.props.imageId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          title: data.title,
          alt: data.alt,
          url: data.url,
          index_page: data.index_page
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {

  const { imageId, isOpen, onClose } = this.props;

    return (
      <div>
        <h1>Open?: {isOpen ? 'true' : 'false'}</h1>
        <h3>Update An Image</h3>
        <button onClick={onClose}>Close</button>
        <form>
          <div>
            <label>Image URL: {this.state.url}</label>
            <input type="hidden" name="project_id" />
          </div>
          <div>
            <label>Image Title: </label>
            <input type="text" name="title" value={this.state.title} />
          </div>
          <div>
            <label>Alt Tag: </label>
            <input type="text" name="alt" value={this.state.alt} />
          </div>
          <div>
            <label>Use this image on index page?: </label>
            <input type="checkbox" name="index_page" checked={this.state.index_page} />
          </div>
          <div>
            <button type="submit">Update</button>
          </div>
        </form>
            <button onClick={onClose}>Cancel</button>
      </div>
    );
  }
}

module.exports = UpdateImage;