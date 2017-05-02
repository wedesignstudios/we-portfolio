import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const DataActions = require('../data/actions');
const FormHandlers = require('../services/form_handlers');
const FormValidations = require('../services/form_validations');
const FormHandlersValidations = require('../services/form_handlers_validations');

class CreateClient extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      url: '',
      nameErr: false,
      urlErr: false
    }

    this.initialState = this.state;
    this.requiredFields = ['name', 'url'];
    this.requiredFieldsBlank = true;
    this.handleOnChange = FormHandlers.handleOnChange;
    this.validateCheckRequiredField = FormValidations.checkRequiredField;
    this.validateCheckRequiredURLField = FormHandlersValidations.checkRequiredURLField;
    this.handleKeyPress = FormHandlers.preventSpaceKey;
    this.prependURL = FormHandlers.prependURL;
    this.submitForm = this.submitForm;
    this.resetForm = FormHandlers.resetForm;
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
    FormValidations.trimData(this.state);
    // DataActions.postRequest(this.state, '/projects', this.resetForm('create-client'));
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3>Add A New Client</h3>
        <form id="create-client">
          <div>
            <label>Client Name: </label>
            <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => this.handleOnChange(e, this)}
                onFocus={(e) => this.handleKeyPress(e)}
                onBlur={(e) => this.validateCheckRequiredField(e, this)} />
            {this.state.nameErr ? <div id="client-name-validation-error" style={{color: 'red'}}>Name can not be blank. Please enter a project name.</div> : null}
          </div>
          <div>
            <label>Website: </label>
            <input
                type="url"
                name="url"
                value={this.state.url}
                placeholder="http://  "
                onChange={(e) => this.handleOnChange(e, this)}
                onFocus={(e) => this.prependURL(e)}
                onBlur={(e) => this.validateCheckRequiredURLField(e, this)} />
            {this.state.urlErr ? <div id="client-url-validation-error" style={{color: 'red'}}>Website can not be blank. Please enter a project name.</div> : null}
          </div>
          <div>
            <button disabled={this.requiredFieldsBlank} onClick={(e) => this.submitForm(e)}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = CreateClient;