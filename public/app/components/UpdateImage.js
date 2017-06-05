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
      projects: [],
      projectName: '',
      project_id: '',
      project_id_detach: '',
      index_page: false,
      success: false
    }
  }

  componentDidMount() {
    fetch(`/api/images/${this.props.imageId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          title: data.title ? data.title : '',
          alt: data.alt ? data.alt : '',
          url: data.url,
          project_id: data.project_id ? data.project_id : '',
          index_page: data.index_page ? data.index_page : false
        });
        if(data.project) {
          this.setState({
            projectName: data.project.name
          })
        }
      })
      .catch((err) => {
        console.error(err);
      });
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          projects: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    this.forceUpdate(function() {
      DataActions.sendRequest('PUT', this.state, `/api/images/${this.props.imageId}/update`, FormHandlers.successMessage(this));
    });
  }

  render() {

  const { imageId, isOpen, onClose } = this.props;

    return (
      <div>
        <h1>Open?: {isOpen ? 'true' : 'false'}</h1>
        <h3>Update An Image</h3>
        <div className="success">
          {this.state.success ? <div id="image-updated-success" style={{color: 'green'}}><p>Image successfully updated.</p></div> : null}
        </div>
        <button onClick={onClose}>Close</button>
        <form id="update-image">
          <div>
            <label>Image URL: {this.state.url}</label>
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
          <div><label>Image attached to: </label>
            <select name="project_id" value={this.state.project_id} onChange={(e) => FormHandlers.handleOnChange(e, this)}>
              <option value=''>No Project</option>
              {this.state.projects.map(project =>
                <option key={project.id} value={project.id}>{project.name}</option>
              )}
            </select>
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