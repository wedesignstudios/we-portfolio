import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';

const FormAddress = require('./FormAddress');
const DataActions = require('../data/actions');
const FormHandlers = require('../services/form_handlers');
const FormValidations = require('../services/form_validations');
const FormHandlersValidations = require('../services/form_handlers_validations');

class FormClient extends React.Component {
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
    this.setRedirectWithMessage = FormHandlers.setRedirectWithMessage.bind(null, this, '/dashboard/clients', this.state.submitError);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  componentDidMount() {
    if(this.props.clientId) {
      fetch(`/api/clients/${this.props.clientId}`)
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

  deleteClient() {
    DataActions.sendRequest(
      'DELETE',
      {name: this.state.name, address_id: this.state.address_id},
      `/api/clients/${this.props.clientId}/delete`,
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
            '/api/clients',
            this.setRedirectWithMessage,
            this.setSubmitErrorMessage
          );
        } else {
          DataActions.sendRequest(
            this.props.sendRequestType,
            this.state,
            `/api/clients/${this.props.clientId}`,
            () => FormHandlers.successMessage(this)
          );
        }
      };
    });

  }

  render() {
    return (
      <div>
        <Link to='/dashboard/clients'>All Clients</Link><br />
        <h3>{this.props.sendRequestType === 'POST' ? 'Create A New Client' : `Update Client: ${this.state.name}`}</h3>
        <div className="submit-message-success">
          {this.state.submitSuccess ? <div id="client-added-success" style={{color: 'green'}}><p>{this.props.sendRequestType === 'POST' ? 'New Client successfully added.' : 'Client successfully updated.'}</p></div> : null}
        </div>
        <div className="submit-message-error" style={{color: 'red'}}><p>{this.state.submitError}</p></div>
        {this.props.sendRequestType === 'PUT' ?
          <button onClick={(e) => this.deleteClient(e)}>Delete {this.state.name}</button> :
        null}
        <form id="create-client">
          <div>
            <label>Client Name: </label>
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
              clientId={this.props.clientId}
              sendAddressData={this.getComponentData} />
          </div>
          <div>
            <button disabled={this.requiredFieldsBlank} onClick={(e) => this.submitForm(e)}>
              {this.props.sendRequestType === 'POST' ? 'Submit' : `Update ${this.state.name}`}
            </button>
          </div>
        </form>
        <div className="errors">
          {this.state.nameErr ? <div id="client-name-validation-error" style={{color: 'red'}}>Client Name can not be blank. Please enter a Client Name.</div> : null}
          {(this.state.urlErr && this.state.urlErrType === 'not valid') ? <div id="client-url-validation-error" style={{color: 'red'}}>Website URL is not valid. Please enter a valid Website URL.</div> : null}
        </div>
      </div>
    );
  }
}

module.exports = withRouter(FormClient);