import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const ClientCheckboxes = require('./ClientCheckboxes');
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
      project_categories_data: [],
      project_categories_ids: [],
      project_categories_ids_detach: [],      
      clients_ids: [],
      clients_ids_attached: [],
      clients_ids_detach: [],
      clients_ids_checked: [],
      collaborators_data: [],
      collaborators_ids: [],
      collaborators_ids_detach: [],
      nameErr: false,
      dateErr: false,
      descriptionErr: false,
      success: false     
    }

    this.initialState = this.state;

    this.requiredFields = ['name', 'date', 'description'];
    this.requiredFieldsBlank = true;
    this.getClientData = this.getClientData.bind(this);
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
          let checked = [];
          let ids = data.clients.map(client => {
            checked.push(client.id);              
            return client.id;
          });

          this.setState({              
            clients_ids_attached: ids,
            clients_ids_checked: checked
          });
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

  getClientData(data) {    
    console.log('Data: ', data);
    
    this.setState({
      clients_ids: data.toAttach,
      clients_ids_attached: data.attached,
      clients_ids_detach: data.detach,
      clients_ids_checked: data.checked      
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
        FormHandlers.updateAttached(this);
        FormHandlers.resetDetached(this);
        FormHandlers.resetToAttachIds(this);
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
            <ClientCheckboxes 
              preChecked={this.state.clients_ids_checked}
              sendClientData={this.getClientData} 
              attached={this.state.clients_ids_attached}
              toAttach={this.state.clients_ids}
              detach={this.state.clients_ids_detach} /> : 
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