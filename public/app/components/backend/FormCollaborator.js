import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';

const FormAddress = require('./FormAddress');
const DataActions = require('../../data/actions');
const FormHandlers = require('../../services/form_handlers');
const FormValidations = require('../../services/form_validations');
const FormHandlersValidations = require('../../services/form_handlers_validations');

class FormCollaborator extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      url: '',
      city: '',
      state: '',
      country: '',
      address_id: '',
      nameErr: false,
      urlErr: false,
      submitSuccess: false,
      submitError: ''
    }

    this.initialState = this.state;
    this.requiredFields = ['name'];
    this.requiredFieldsBlank = true;
    this.getComponentData = this.getComponentData.bind(this);
    this.setRedirectWithMessage = FormHandlers.setRedirectWithMessage.bind(null, this, '/dashboard/collaborators', this.state.submitError);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  componentDidMount() {
    if(this.props.collaboratorId) {
      fetch(`/api/collaborators/${this.props.collaboratorId}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data.name,
            url: data.url,
          });
          if(data.address.length > 0) {
            this.setState({
              city: data.address[0].city,
              state: data.address[0].state,
              country: data.address[0].country,
              address_id: data.address[0].id
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  getComponentData(data, inputName) {
    this.setState({
      [inputName]: data[inputName]
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.requiredFieldsBlank = FormValidations.areAnyRequiredFieldsBlank(this.requiredFields, nextState);

    return true;
  }

  deleteCollaborator() {
    DataActions.sendRequest(
      'DELETE',
      {name: this.state.name, address_id: this.state.address_id},
      `/api/collaborators/${this.props.collaboratorId}/delete`,
      this.setRedirectWithMessage,
      this.setSubmitErrorMessage
    );
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    if(this.state.url) {
      FormHandlersValidations.validateHandleURL(this.state.url, this);
    }

    this.forceUpdate(function() {
      if (!this.state.urlErr) {
        if(this.props.sendRequestType === 'POST') {
          DataActions.sendRequest(
            this.props.sendRequestType,
            this.state,
            '/api/collaborators',
            this.setRedirectWithMessage,
            this.setSubmitErrorMessage
          );
        } else {
          DataActions.sendRequest(
            this.props.sendRequestType,
            this.state,
            `/api/collaborators/${this.props.collaboratorId}`,
            () => FormHandlers.successMessage(this)
          );
        }
      };
    });

  }

  render() {
    return (
      <div>
      <Link to='/dashboard/collaborators'>All Collaborators</Link><br />
        <h3>{this.props.sendRequestType === 'POST' ? 'Create A New Collaborator' : `Update Collaborator: ${this.state.name}`}</h3>
        <div className="submit-message-success">
          {this.state.submitSuccess ? <div id="collaborator-added-success" style={{color: 'green'}}><p>{this.props.sendRequestType === 'POST' ? 'New Collaborator successfully added.' : 'Collaborator successfully updated.'}</p></div> : null}
        </div>
        <div className="submit-message-error" style={{color: 'red'}}><p>{this.state.submitError}</p></div>
        {this.props.sendRequestType === 'PUT' ?
          <button onClick={(e) => this.deleteCollaborator(e)}>Delete {this.state.name}</button> :
        null}
        <form id="create-collaborator">
          <div>
            <label>Collaborator Name: </label>
            <input
                type="text"
                name="name"
                className={this.state.nameErr ? 'err' : null}
                value={this.state.name}
                onChange={(e) => FormHandlers.handleOnChange(e, this)}
                onBlur={(e) => FormValidations.checkField(e, this)} />
          </div>
          <div>
            <label>Website: </label>
            <input
                type="text"
                name="url"
                className={this.state.urlErr ? 'err' : null}
                value={this.state.url}
                onChange={(e) => FormHandlers.handleOnChange(e, this)}
                onBlur={(e) => FormValidations.checkField(e, this)} />
          </div>
          <div>
            <label>Address: </label>
            <FormAddress
              collaboratorId={this.props.collaboratorId}
              sendAddressData={this.getComponentData} />
          </div>
          <div>
            <button disabled={this.requiredFieldsBlank} onClick={(e) => this.submitForm(e)}>
              {this.props.sendRequestType === 'POST' ? 'Submit' : `Update ${this.state.name}`}
            </button>
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

module.exports = withRouter(FormCollaborator);