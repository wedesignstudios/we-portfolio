import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const ClientCheckboxes = require('./ClientCheckboxes');
const CollaboratorCheckboxes = require('./CollaboratorCheckboxes');
const ModalAddImages = require('./ModalAddImages');
const ProjectCategoriesCheckboxes = require('./ProjectCategoriesCheckboxes');
const DataActions = require('../../data/actions');
const FormHandlers = require('../../services/form_handlers');
const FormValidations = require('../../services/form_validations');
const FormHandlersValidations = require('../../services/form_handlers_validations');

class FormProject extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      initialName: '',
      date: '',
      description: '',
      project_categories_ids: [],
      project_categories_ids_attached: [],
      project_categories_ids_detach: [],
      project_categories_ids_checked: [],
      clients_ids: [],
      clients_ids_attached: [],
      clients_ids_detach: [],
      clients_ids_checked: [],
      collaborators_ids: [],
      collaborators_ids_attached: [],
      collaborators_ids_detach: [],
      collaborators_ids_checked: [],
      nameErr: false,
      dateErr: false,
      descriptionErr: false,
      submitSuccess: false,
      submitError: ''
    }

    this.initialState = this.state;

    this.requiredFields = ['name', 'date', 'description'];
    this.requiredFieldsBlank = true;
    this.getComponentData = this.getComponentData.bind(this);
    this.setRedirectWithMessage = FormHandlers.setRedirectWithMessage.bind(null, this, '/dashboard/projects', this.state.submitError);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  setAttachedAndChecked(dataModel, dataModelName) {
    let checked = [];
    let ids = dataModel.map(model => {
      checked.push(model.id);
      return model.id;
    });

    this.setState({
      [dataModelName + '_ids_attached']: ids,
      [dataModelName + '_ids_checked']: checked
    });
  }

  componentDidMount() {    
    if(this.props.projectId) {
      fetch(`/api/projects/${this.props.projectId}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data.name,
            initialName: data.name,
            date: moment(data.date),
            description: data.description
          });
        if(data.clients) {
          this.setAttachedAndChecked(data.clients, 'clients');
        };
        if(data.collaborators) {
          this.setAttachedAndChecked(data.collaborators, 'collaborators');
        };
        if(data.project_categories) {
          this.setAttachedAndChecked(data.project_categories, 'project_categories');
        }
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.requiredFieldsBlank = FormValidations.areAnyRequiredFieldsBlank(this.requiredFields, nextState);

    return true;
  }

  getComponentData(data, inputName) {
    this.setState({
      [inputName]: data.toAttach,
      [inputName + '_attached']: data.attached,
      [inputName + '_detach']: data.detach,
      [inputName + '_checked']: data.checked
    })
  }

  openImageModal(event) {
    event.preventDefault();
    $(ReactDOM.findDOMNode(this.refs.modal)).modal();
  }

  deleteProject() {
    DataActions.sendRequest(
      'DELETE',
      {name: this.state.name},
      `/api/projects/${this.props.projectId}/delete`,
      this.setRedirectWithMessage,
      this.setSubmitErrorMessage
    );
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    this.forceUpdate(function() {
      if(this.props.sendRequestType === 'POST') {
        DataActions.sendRequest(
          this.props.sendRequestType,
          this.state,
          '/api/projects',
          this.setRedirectWithMessage,
          this.setSubmitErrorMessage
        );
      } else {
        DataActions.sendRequest(
          this.props.sendRequestType,
          this.state,
          `/api/projects/${this.props.projectId}`,
          this.setRedirectWithMessage,
          this.setSubmitErrorMessage
        );
      }
    })
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <Link to='/dashboard/projects' className="btn btn-outline-primary mb-3">All Projects</Link><br />
          <h1>
            <span className="badge badge-default">
              {this.props.sendRequestType === 'POST' ?
                'Create A New Project' :
                `Update Project: ${this.state.initialName}`}
            </span>
          </h1>

          {this.props.sendRequestType === 'PUT' ?
            <button
              className="btn btn-danger mb-3"
              onClick={(e) => this.deleteProject(e)}>
                Delete {this.state.initialName}
            </button> :
          null}

          <div className="submit-message-success">
            {this.state.submitSuccess ?
              <div id="project-added-success"
                className="alert alert-success">
                {this.props.sendRequestType === 'POST' ?
                  'New Project successfully added.' :
                  'Project successfully updated.'}
              </div> :
            null}
          </div>

          <div className="submit-message-error">
            {this.state.submitError ?
              `<div className="alert alert-danger">
                ${this.state.submitError}
              </div>` :
              null}
          </div>

          <div className="container-fluid">
            <form id="create-project">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Project Name: </label>
                <div className="col-sm-8">
                  <input
                      type="text"
                      name="name"
                      className={this.state.nameErr ? 'err form-control' : 'form-control'}
                      value={this.state.name}
                      onChange={(e) => FormHandlers.handleOnChange(e, this)}
                      onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                      onBlur={(e) => FormValidations.checkField(e, this)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Date Completed: </label>
                <div className="col-sm-8">
                  <DatePicker
                      selected={this.state.date}
                      value={this.state.date}
                      name="date"
                      className={this.state.dateErr ? 'err form-control' : 'form-control'}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="Click to select a date"
                      popoverAttachment="top right"
                      popoverTargetAttachment="top center"
                      popoverTargetOffset="38px 250px"
                      onChange={(e) => FormHandlersValidations.handleDateOnChange(e, this)}
                      onFocus={(e) => FormHandlers.preventAllButShiftAndTab(e)}
                      onBlur={(e) => FormValidations.checkField(e, this)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Description: </label>
                <div className="col-sm-8">
                  <textarea
                      type="textfield"
                      name="description"
                      className={this.state.descriptionErr ? 'err form-control' : 'form-control'}
                      value={this.state.description}
                      onChange={(e) => FormHandlers.handleOnChange(e, this)}
                      onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                      onBlur={(e) => FormValidations.checkField(e, this)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Image(s): </label>
                <div className="col-sm-8">
                  <button
                    className="btn btn-secondary"
                    onClick={(e) => this.openImageModal(e)} >
                      Add Image(s)
                  </button>
                </div>
              </div>

              <ModalAddImages
                ref="modal"
                sendImageData={this.getComponentData} />

              <ClientCheckboxes
                preChecked={this.state.clients_ids_checked}
                sendClientData={this.getComponentData}
                attached={this.state.clients_ids_attached}
                toAttach={this.state.clients_ids}
                detach={this.state.clients_ids_detach} />

              <CollaboratorCheckboxes
                preChecked={this.state.collaborators_ids_checked}
                sendCollaboratorData={this.getComponentData}
                attached={this.state.collaborators_ids_attached}
                toAttach={this.state.collaborators_ids}
                detach={this.state.collaborators_ids_detach} />

              <ProjectCategoriesCheckboxes
                preChecked={this.state.project_categories_ids_checked}
                sendProjectCategoriesData={this.getComponentData}
                attached={this.state.project_categories_ids_attached}
                toAttach={this.state.project_categories_ids}
                detach={this.state.project_categories_ids_detach} />

              <div className="form-group row">
                <div className="col-10 d-flex justify-content-end">
                  <button
                    className="btn btn-outline-primary"
                    disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}>
                      {this.props.sendRequestType === 'PUT' ?
                        `Update ${this.state.initialName}`:
                        'Create New Project'}
                  </button>
                </div>
              </div>
            </form>

            <div className="errors row">
              <div className="col-sm-10">
                {this.state.nameErr ?
                  <div
                    id="project-name-validation-error"
                    className="alert alert-danger"
                    role="alert">
                      Name can not be blank. Please enter a project name.
                  </div> :
                null}
                {this.state.dateErr ?
                  <div
                    id="project-date-validation-error"
                    className="alert alert-danger"
                    role="alert">
                      Date can not be blank. Please enter a project completed date.
                  </div> :
                null}
                {this.state.descriptionErr ?
                  <div id="project-description-validation-error"
                  className="alert alert-danger"
                  role="alert">
                    Description can not be blank. Please enter a project description.
                  </div> :
                null}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = withRouter(FormProject);