import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const ClientCheckboxes = require('./ClientCheckboxes');
const CollaboratorCheckboxes = require('./CollaboratorCheckboxes');
const ProjectCategoriesCheckboxes = require('./ProjectCategoriesCheckboxes');
const DataActions = require('../data/actions');
const FormHandlers = require('../services/form_handlers');
const FormValidations = require('../services/form_validations');
const FormHandlersValidations = require('../services/form_handlers_validations');

class FormProject extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      date: '',
      description: '',
      project_categories_ids: [],
      project_categories_attached: [],
      project_categories_ids_detach: [],
      project_categories_ids_checked: [],
      clients_ids: [],
      clients_ids_attached: [],
      clients_ids_detach: [],
      clients_ids_checked: [],
      collaborators_ids: [],
      collaborators_attached: [],
      collaborators_ids_detach: [],
      collaborators_ids_checked: [],
      nameErr: false,
      dateErr: false,
      descriptionErr: false,
      success: false     
    }

    this.initialState = this.state;

    this.requiredFields = ['name', 'date', 'description'];
    this.requiredFieldsBlank = true;
    this.getComponentData = this.getComponentData.bind(this);
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
            date: data.date,
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

  shouldComponentUpdate(nextProps, nextState) {
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

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    this.forceUpdate(function(){
      if(this.props.sendRequestType === 'POST') {
        DataActions.sendRequest(this.props.sendRequestType, this.state, '/api/projects', FormHandlers.successCallback('create-project', this));
      } else {
        DataActions.sendRequest(this.props.sendRequestType, this.state, `/api/projects/${this.props.projectId}`, FormHandlers.successMessage(this));
        FormHandlers.updateAttached(this, ['clients', 'collaborators', 'project_categories']);
        FormHandlers.resetDetached(this, ['clients', 'collaborators', 'project_categories']);
        FormHandlers.resetToAttachIds(this, ['clients', 'collaborators', 'project_categories']);
      }
    })
  }

  render() {
    return (
      <div>
        <h3>{this.props.sendRequestType === 'POST' ? 'Create A New Project' : `Update Project: ${this.state.name}`}</h3>
        <div className="success">
          {this.state.success ? <div id="project-added-success" style={{color: 'green'}}><p>{this.props.sendRequestType === 'POST' ? 'New Project successfully added.' : 'Project successfully updated.'}</p></div> : null}
        </div>
        <form id="create-project">
          <div>
            <label>Project Name: </label>
            <input
                type="text"
                name="name"
                className={this.state.nameErr ? 'err' : null}
                value={this.state.name}
                onChange={(e) => FormHandlers.handleOnChange(e, this)}
                onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                onBlur={(e) => FormValidations.checkField(e, this)} />
          </div>

          <div>
            <label>Date Completed: </label>
            <DatePicker
                selected={this.state.date}
                value={this.state.date}
                name="date"
                className={this.state.dateErr ? 'err' : null}
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

          <div>
            <label>Description: </label>
            <input
                type="textfield"
                name="description"
                className={this.state.descriptionErr ? 'err' : null}
                value={this.state.description}
                onChange={(e) => FormHandlers.handleOnChange(e, this)}
                onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                onBlur={(e) => FormValidations.checkField(e, this)} />
          </div>
          {this.props.projectId ?
            <div className="update-components-container">
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
              </div> :
          null}
          <div>
            <button disabled={this.requiredFieldsBlank} onClick={(e) => this.submitForm(e)}>Submit</button>
          </div>
        </form>
        <div className="errors">
          {this.state.nameErr ? <div id="project-name-validation-error" style={{color: 'red'}}>Name can not be blank. Please enter a project name.</div> : null}
          {this.state.dateErr ? <div id="project-date-validation-error" style={{color: 'red'}}>Date can not be blank. Please enter a project completed date.</div> : null}
          {this.state.descriptionErr ? <div id="project-description-validation-error" style={{color: 'red'}}>Description can not be blank. Please enter a project description.</div> : null}
        </div>
      </div>
    );
  }
}

module.exports = FormProject;