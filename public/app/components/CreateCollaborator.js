import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const DataActions = require('../data/actions');
const FormHandlers = require('../services/form_handlers');
const FormValidations = require('../services/form_validations');
const FormHandlersValidations = require('../services/form_handlers_validations');

class CreateCollaborator extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      url: '',
      nameErr: false,
      urlErr: false
    }

    this.initialState = this.state;
    this.requiredFields = ['name'];
    this.requiredFieldsBlank = true;
    this.handleOnChange = FormHandlers.handleOnChange;
    this.validateCheckField = FormValidations.checkField;
    this.handleKeyPress = FormHandlers.preventSpaceKey;
    this.submitForm = this.submitForm;
    this.resetForm = FormHandlers.resetForm;
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.requiredFieldsBlank = FormValidations.areAnyRequiredFieldsBlank(this.requiredFields, nextState);

    return true;
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    FormHandlersValidations.validateHandleURL(this.state.url, this);

    this.forceUpdate(function() {
      if (!this.state.urlErr) {
        DataActions.sendRequest('POST', this.state, '/api/collaborators', this.resetForm('create-collaborator'));
      };
    });

  }

  render() {
    return (
      <div>
        <h3>Add A New Collaborator</h3>
        <form id="create-collaborator">
          <div>
            <label>Collaborator Name: </label>
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
            <label>Website: </label>
            <input
                type="text"
                name="url"
                className={this.state.urlErr ? 'err' : null}
                value={this.state.url}
                onChange={(e) => this.handleOnChange(e, this)}
                onBlur={(e) => this.validateCheckField(e, this)} />
          </div>
          <div>
            <button disabled={this.requiredFieldsBlank} onClick={(e) => this.submitForm(e)}>Submit</button>
          </div>
        </form>
        <div className="errors">
          {this.state.nameErr ? <div id="collaborator-name-validation-error" style={{color: 'red'}}>Collaborator Name can not be blank. Please enter a Collaborator Name.</div> : null}
          {(this.state.urlErr && this.state.urlErrType === 'not valid') ? <div id="collaborator-url-validation-error" style={{color: 'red'}}>Website URL is not valid. Please enter a valid Website URL.</div> : null}
        </div>
      </div>
    );
  }
}

module.exports = CreateCollaborator;