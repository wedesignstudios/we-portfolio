import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../services/form_handlers');
const FormValidations = require('../services/form_validations');
const DataActions = require('../data/actions');

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
          title: data.title ? data.title : '',
          alt: data.alt ? data.alt : '',
          url: data.url,
          index_page: data.index_page ? data.index_page : false
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    this.forceUpdate(function() {
      DataActions.sendRequest('PUT', this.state, `/images/${this.props.imageId}/update`);
    });
  }

  render() {

  const { imageId, isOpen, onClose } = this.props;

    return (
      <div>
        <h1>Open?: {isOpen ? 'true' : 'false'}</h1>
        <h3>Update An Image</h3>
        <button onClick={onClose}>Close</button>
        <form id="update-image">
          <div>
            <label>Image URL: {this.state.url}</label>
            <input type="hidden" name="project_id" />
          </div>
          <div>
            <label>Image Title: </label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => FormHandlers.handleOnChange(e, this)}
              onFocus={(e) => FormHandlers.preventSpaceKey(e)} />
          </div>
          <div>
            <label>Alt Tag: </label>
            <input
              type="text"
              name="alt"
              value={this.state.alt}
              onChange={(e) => FormHandlers.handleOnChange(e, this)}
              onFocus={(e) => FormHandlers.preventSpaceKey(e)} />
          </div>
          <div>
            <label>Use this image on index page?: </label>
            <input
              type="checkbox"
              name="index_page"
              checked={this.state.index_page}
              onChange={(e) => FormHandlers.checkboxChange(e, this)} />
          </div>
          <div>
            <button
              type="submit"
              onClick={(e) => this.submitForm(e)}>Update</button>
          </div>
        </form>
          <button onClick={onClose}>Cancel</button>
      </div>
    );
  }
}

module.exports = UpdateImage;