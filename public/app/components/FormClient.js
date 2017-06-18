import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormAddress = require('./FormAddress');
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
      urlErr: false,
      success: false
    }

    this.initialState = this.state;
    this.requiredFields = ['name'];
    this.requiredFieldsBlank = true;
  }

  componentDidMount() {
    if(this.props.clientId) {
      fetch(`/api/clients/${this.props.clientId}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data.name,
            url: data.url
          })
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

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    FormHandlersValidations.validateHandleURL(this.state.url, this);

    this.forceUpdate(function() {
      if (!this.state.urlErr) {
        if(this.props.sendRequestType === 'POST') {
        DataActions.sendRequest(this.props.sendRequestType, this.state, '/api/clients', FormHandlers.successCallback('create-client', this)); 
        } else {
          DataActions.sendRequest(this.props.sendRequestType, this.state, `/api/clients/${this.props.clientId}`, FormHandlers.successMessage(this));
        }
      };
    });

  }

  render() {
    return (
      <div>
        <h3>{this.props.sendRequestType === 'POST' ? 'Create A New Client' : `Update Client: ${this.state.name}`}</h3>
        <div className="success">
          {this.state.success ? <div id="client-added-success" style={{color: 'green'}}><p>{this.props.sendRequestType === 'POST' ? 'New Client successfully added.' : 'Client successfully updated.'}</p></div> : null}
        </div>
        <form id="create-client">
          <div>
            <label>Client Name: </label>
            <input
                type="text"
                name="name"
                className={this.state.nameErr ? 'err' : null}      value={this.state.name}
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
          {this.props.clientId ? 
            <div className="update-components-container">
              <FormAddress />
            </div> :
          null}          
          <div>
            <button disabled={this.requiredFieldsBlank} onClick={(e) => this.submitForm(e)}>Submit</button>
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

module.exports = CreateClient;