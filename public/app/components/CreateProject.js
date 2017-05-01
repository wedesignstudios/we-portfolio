import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const DataActions = require('../data/actions');
const FormHandlers = require('../services/form_input_handlers');
const FormValidations = require('../services/form_validations');

class CreateProject extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      date: '',
      description: '',
      nameErr: false,
      dateErr: false,
      descriptionErr: false
    }

    this.requiredFields = ['name', 'date', 'description'];
    this.requiredFieldsBlank = true;
    this.handleOnChange = FormHandlers.handleOnChange;
    this.validateCheckRequiredField = FormValidations.checkRequiredField;
    this.handleKeyPress = FormHandlers.preventSpaceKey;
    this.handleDateKeyPress = FormHandlers.preventAllButShiftAndTab;
    this.submitForm = this.submitForm.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(FormValidations.areAnyRequiredFieldsBlank(this, nextState)) {
      this.requiredFieldsBlank = true;
    } else {
      this.requiredFieldsBlank = false;
    };

    return true;
  }

  submitForm(event) {
    event.preventDefault();

    // DataActions.postRequest(this.state, '/projects');
  }

  render() {
    return (
      <div>
        <h3>Add A New Project</h3>
        <form>
          <div>
            <label>Project Name: </label>
            <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => this.handleOnChange(e, this)}
                onFocus={(e) => this.handleKeyPress(e)}
                onBlur={(e) => this.validateCheckRequiredField(e)} />
            {this.state.nameErr ? <div id="project-name-validation-error" style={{color: 'red'}}>Name can not be blank. Please enter a project name.</div> : null}
          </div>

          <div>
            <label>Date Completed: </label>
            <DatePicker
                selected={this.state.date}
                value={this.state.date}
                name="date"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Click to select a date"
                popoverAttachment="top right"
                popoverTargetAttachment="top center"
                popoverTargetOffset="30px 0px"
                onChange={(e) => this.handleOnChange(e, this)}
                onFocus={(e) => this.handleDateKeyPress(e)}
                onBlur={(e) => this.validateCheckRequiredField(e)} />
            {this.state.dateErr ? <div id="project-date-validation-error" style={{color: 'red'}}>Date can not be blank. Please enter a project completed date.</div> : null}
          </div>

          <div>
            <label>Description: </label>
            <input
                type="textfield"
                name="description"
                value={this.state.description}
                onChange={(e) => this.handleOnChange(e, this)}
                onFocus={(e) => this.handleKeyPress(e)}
                onBlur={(e) => this.validateCheckRequiredField(e)} />
            {this.state.descriptionErr ? <div id="project-description-validation-error" style={{color: 'red'}}>Description can not be blank. Please enter a project description.</div> : null}
          </div>
          <div>
            <button disabled={this.requiredFieldsBlank} onClick={this.submitForm}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = CreateProject;