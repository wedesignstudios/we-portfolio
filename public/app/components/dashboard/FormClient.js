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

class FormClient extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      initialName: '',
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

  componentDidUpdate() {
    FormValidations.clearErrsIfNoneBeforeOnBlur(this, ['nameErr']);
  }

  componentDidMount() {
    if(this.props.clientId) {
      fetch(`/api/v1/clients/${this.props.clientId}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data.name,
            initialName: data.name,
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
      {name: this.state.initialName, address_id: this.state.address_id},
      `/api/v1/clients/${this.props.clientId}/delete`,
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
            '/api/v1/clients',
            this.setRedirectWithMessage,
            this.setSubmitErrorMessage
          );
        } else {
          DataActions.sendRequest(
            this.props.sendRequestType,
            this.state,
            `/api/v1/clients/${this.props.clientId}`,
            this.setRedirectWithMessage,
            this.setSubmitErrorMessage
          );
        }
      };
    });

  }

  render() {
    return (
      <div className="row m-0 justify-content-center">
        <div className="col-sm-6">

          <div className="container-fluid">
            <div className="row">
              <h2 className="font-weight-bold">
                {this.props.sendRequestType === 'POST' ? 'Create A New Client' : `Update: ${this.state.initialName}`}
              </h2>
              <Link to='/dashboard/clients' className="btn btn-primary ml-auto">All Clients</Link>
            </div>
            <div className="row">
              <hr className="col" />
            </div>

            {this.props.sendRequestType === 'PUT' ?
              <div>
                <button
                  className="btn btn-danger mb-3"
                  onClick={(e) => this.deleteClient(e)}>
                    Delete {this.state.initialName}
                </button>
              </div> :
            null}

            <div className="col submit-message-error">
              {this.state.submitError ?
                <div className="alert alert-danger">
                  {this.state.submitError}
                </div>
              : null}
            </div>

            <div className="errors row">
              <div className="col">
                {this.state.nameErr ?
                  <div
                    id="client-name-validation-error"
                    className="alert alert-danger"
                    role="alert">
                      Client Name can not be blank. Please enter a Client Name.
                  </div> :
                null}
                {(this.state.urlErr && this.state.urlErrType === 'not valid') ?
                  <div
                    id="client-url-validation-error"
                    className="alert alert-danger">
                      Website URL is not valid. Please enter a valid Website URL.
                  </div> :
                null}
              </div>
            </div>

            <form id="create-client">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Client Name: </label>
                  <div className="col-sm-10">
                    <input
                        type="text"
                        name="name"
                        className={this.state.nameErr ? 'err form-control' : 'form-control'}
                        value={this.state.name}
                        onChange={(e) => FormHandlers.handleOnChange(e, this)}
                        onBlur={(e) => {FormValidations.checkField(e, this);}} />
                  </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Website: </label>
                <div className="col-sm-10">
                  <input
                      type="text"
                      name="url"
                      className={this.state.urlErr ? 'err form-control' : 'form-control'}
                      value={this.state.url}
                      onChange={(e) => FormHandlers.handleOnChange(e, this)}
                      onBlur={(e) => FormValidations.checkField(e, this)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Address: </label>
                <div className="col-sm-10">
                  <FormAddress
                    clientId={this.props.clientId}
                    sendAddressData={this.getComponentData} />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link to='/dashboard/clients' className="btn btn-secondary mr-3">Cancel</Link><br />
                  <button
                    className="btn btn-primary"
                    disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}>
                      {this.props.sendRequestType === 'PUT' ?
                        `Update ${this.state.initialName}` :
                        'Submit'}
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

module.exports = withRouter(FormClient);