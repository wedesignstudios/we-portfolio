import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const DataActions = require('../data/actions');
const FormHandlers = require('../services/form_handlers');
const FormValidations = require('../services/form_validations');
const FormHandlersValidations = require('../services/form_handlers_validations');

class CreateProject extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      date: '',
      description: '',
      nameErr: false,
      dateErr: false,
      descriptionErr: false,
      success: false
    }

    this.initialState = this.state;

    this.requiredFields = ['name', 'date', 'description'];
    this.requiredFieldsBlank = true;
    this.handleOnChange = FormHandlers.handleOnChange;
    this.handleDateOnChange = FormHandlersValidations.handleDateOnChange;
    this.validateCheckField = FormValidations.checkField;
    this.handleKeyPress = FormHandlers.preventSpaceKey;
    this.handleDateKeyPress = FormHandlers.preventAllButShiftAndTab;
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.requiredFieldsBlank = FormValidations.areAnyRequiredFieldsBlank(this.requiredFields, nextState);

    return true;
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    this.forceUpdate(function(){
      DataActions.sendRequest('POST', this.state, '/api/projects', FormHandlers.successCallback('create-project', this));
    })
  }

  render() {
    return (
      <div>
        <h3>Add A New Project</h3>
        <div className="success">
          {this.state.success ? <div id="project-added-success" style={{color: 'green'}}><p>New Project successfully added.</p></div> : null}
        </div>
        <form id="create-project">
          <div>
            <label>Project Name: </label>
            <input
                type="text"
                name="name"
                className={this.state.nameErr ? 'err' : null}
                value={this.state.name}
                onChange={(e) => this.handleOnChange(e, this)}
                onFocus={(e) => this.handleKeyPress(e)}
                onBlur={(e) => this.validateCheckField(e, this)} />
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
                onChange={(e) => this.handleDateOnChange(e, this)}
                onFocus={(e) => this.handleDateKeyPress(e)}
                onBlur={(e) => this.validateCheckField(e, this)} />
          </div>

          <div>
            <label>Description: </label>
            <input
                type="textfield"
                name="description"
                className={this.state.descriptionErr ? 'err' : null}
                value={this.state.description}
                onChange={(e) => this.handleOnChange(e, this)}
                onFocus={(e) => this.handleKeyPress(e)}
                onBlur={(e) => this.validateCheckField(e, this)} />
          </div>
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

module.exports = CreateProject;