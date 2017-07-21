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
      images_ids: [],
      images_ids_urls: [],
      images_ids_attached: [],
      images_ids_attached_data: [],
      images_ids_detach: [],
      clients_ids: [],
      clients_ids_attached: [],
      clients_ids_detach: [],
      clients_ids_selected: [],
      collaborators_ids: [],
      collaborators_ids_attached: [],
      collaborators_ids_detach: [],
      collaborators_ids_selected: [],
      project_categories_ids: [],
      project_categories_ids_attached: [],
      project_categories_ids_detach: [],
      project_categories_ids_selected: [],
      nameErr: false,
      dateErr: false,
      descriptionErr: false,
      submitError: '',
      clearModalErrs: false
    }

    this.initialState = this.state;

    this.requiredFields = ['name', 'date', 'description'];
    this.requiredFieldsBlank = true;
    this.getComponentData = this.getComponentData.bind(this);
    this.setRedirectWithMessage = FormHandlers.setRedirectWithMessage.bind(null, this, '/dashboard/projects', this.state.submitError);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
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
          this.setAttachedAndSelected(data.clients, 'clients');
        };
        if(data.collaborators) {
          this.setAttachedAndSelected(data.collaborators, 'collaborators');
        };
        if(data.project_categories) {
          this.setAttachedAndSelected(data.project_categories, 'project_categories');
        };
        if(data.images) {
          this.setAttachedAndSelected(data.images, 'images');
          this.setAttachedData(data.images, 'images');
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

  componentDidUpdate() {
    FormValidations.clearErrsIfNoneBeforeOnBlur(this, ['nameErr', 'dateErr', 'descriptionErr']);
  }

  setAttachedAndSelected(dataModel, dataModelName) {
    let selected = [];
    let ids = dataModel.map(model => {
      selected.push(model.id);
      return model.id;
    });

    if(dataModelName === 'images') {
      this.setState({
        [dataModelName + '_ids_attached']: ids
      })
    } else {
      this.setState({
        [dataModelName + '_ids_attached']: ids,
        [dataModelName + '_ids_selected']: selected
      });
    }
  }

  setAttachedData(dataModel, dataModelName) {
    this.setState({
      [dataModelName + '_ids_attached_data']: dataModel
    });
  }

  getComponentData(data, inputName) {
    if(inputName === 'images_ids') {
      this.setState({
        [inputName + '_urls']: data.toAttachImgUrls
      })
    }

    this.setState({
      [inputName]: data.toAttach,
      [inputName + '_attached']: data.attached,
      [inputName + '_detach']: data.detach,
      [inputName + '_selected']: data.selected
    });
  }

  openImageModal(event) {
    event.preventDefault();
    $(ReactDOM.findDOMNode(this.refs.modal)).modal();
    this.setState({clearModalErrs: true});
  }

  deleteProject() {
    DataActions.sendRequest(
      'DELETE',
      {name: this.state.initialName},
      `/api/projects/${this.props.projectId}/delete`,
      this.setRedirectWithMessage,
      this.setSubmitErrorMessage
    );
  }

  showAttachedImages() {
    let images = this.state.images_ids_attached_data.filter(img => {
      return !this.state.images_ids_detach.includes(img.id);
    });

    return images.map((img, i) => {
      return <img
          key={i}
          src={img.url}
          className="mb-3 mr-3"
          height="100" />
    })
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
        <div className="col-sm-6">

          <div className="container-fluid">
            <div className="row">
              <h2 className="font-weight-bold">
                {this.props.sendRequestType === 'POST' ?
                  'Add A New Project' :
                  `Update: ${this.state.initialName}`}
              </h2>
              <Link to='/dashboard/projects' className="btn btn-primary ml-auto">All Projects</Link>
            </div>
            <div className="row">
              <hr className="col" />
            </div>

            {this.props.sendRequestType === 'PUT' ?
              <div>
                <button
                  className="btn btn-danger mb-3"
                  onClick={(e) => this.deleteProject(e)}>
                    Delete {this.state.initialName}
                </button>
              </div> :
            null}

            <div className="col submit-message-error">
              {this.state.submitError ?
                `<div className="alert alert-danger">
                  ${this.state.submitError}
                </div>` :
                null}
            </div>

            <div className="errors row">
              <div className="col">
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

            <form id="create-project">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Project Name: </label>
                <div className="col-sm-10">
                  <input
                      type="text"
                      name="name"
                      className={this.state.nameErr ? 'err form-control' : 'form-control'}
                      value={this.state.name}
                      onChange={(e) => FormHandlers.handleOnChange(e, this)}
                      onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                      onBlur={(e) => {FormValidations.checkField(e, this);}} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Date Completed: </label>
                <div className="col-sm-10">
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
                <div className="col-sm-10">
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
                <div className="col-sm-10">
                    <div className="row">
                      <div className="col-sm-12">
                        {this.showAttachedImages()}

                        {this.state.images_ids_urls.map((url, i) => {
                          return <img
                              key={i}
                              src={url}
                              className="mb-3 mr-3"
                              height="100" />
                        })}
                      </div>
                    </div>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => this.openImageModal(e)} >
                        Add/Remove Image(s)
                    </button>
                </div>
              </div>

              <ModalAddImages
                ref="modal"
                parentForm="project"
                sendImageData={this.getComponentData}
                attached={this.state.images_ids_attached}
                detach={this.state.images_ids_detach}
                toAttach={this.state.images_ids}
                toAttachImgUrls={this.state.images_ids_urls}
                clearModalErrs={this.state.clearModalErrs} />

              <ClientCheckboxes
                preSelected={this.state.clients_ids_selected}
                sendClientData={this.getComponentData}
                attached={this.state.clients_ids_attached}
                toAttach={this.state.clients_ids}
                detach={this.state.clients_ids_detach} />

              <CollaboratorCheckboxes
                preSelected={this.state.collaborators_ids_selected}
                sendCollaboratorData={this.getComponentData}
                attached={this.state.collaborators_ids_attached}
                toAttach={this.state.collaborators_ids}
                detach={this.state.collaborators_ids_detach} />

              <ProjectCategoriesCheckboxes
                preSelected={this.state.project_categories_ids_selected}
                sendProjectCategoriesData={this.getComponentData}
                attached={this.state.project_categories_ids_attached}
                toAttach={this.state.project_categories_ids}
                detach={this.state.project_categories_ids_detach} />

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link to='/dashboard/projects' className="btn btn-secondary mr-3">Cancel</Link><br />
                  <button
                    className="btn btn-primary"
                    disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}>
                      {this.props.sendRequestType === 'PUT' ?
                        `Update ${this.state.initialName}`:
                        'Create New Project'}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = withRouter(FormProject);