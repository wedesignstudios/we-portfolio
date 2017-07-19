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

  deleteCollaborator() {
    DataActions.sendRequest(
      'DELETE',
      {name: this.state.initialName, address_id: this.state.address_id},
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
      <div className="row justify-content-center">
        <div className="col-6">
          <Link to='/dashboard/collaborators' className="btn btn-primary mb-3">All Collaborators</Link>
            <h1>
              <span className="badge badge-default p-3">
              {this.props.sendRequestType === 'POST' ? 'Create A New Collaborator' : `Update Collaborator: ${this.state.initialName}`}
              </span>
            </h1>

            {this.props.sendRequestType === 'PUT' ?
              <div className="d-flex justify-content-end pr-3">
                <button
                  className="btn btn-danger mb-3"
                  onClick={(e) => this.deleteCollaborator(e)}>
                    Delete {this.state.initialName}
                </button>
              </div> :
            null}

            <div className="submit-message-error">
              {this.state.submitError ?
                <div className="alert alert-danger">
                  {this.state.submitError}
                </div> :
              null}
            </div>

            <div className="errors row">
              <div className="col-sm-10">
                {this.state.nameErr ?
                  <div
                    id="collaborator-name-validation-error"
                    className="alert alert-danger">
                      Collaborator Name can not be blank. Please enter a Collaborator Name.
                  </div> :
                null}
                {(this.state.urlErr && this.state.urlErrType === 'not valid') ?
                  <div
                    id="collaborator-name-validation-error"
                    className="alert alert-danger">
                      Website URL is not valid. Please enter a valid Website URL.
                  </div> :
                null}
              </div>
            </div>

            <div className="container-fluid">
              <form id="create-collaborator">
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Collaborator Name: </label>
                    <div className="col-sm-10">
                      <input
                          type="text"
                          name="name"
                          className={this.state.nameErr ? 'err form-control' : 'form-control'}
                          value={this.state.name}
                          onChange={(e) => FormHandlers.handleOnChange(e, this)}
                          onBlur={(e) => FormValidations.checkField(e, this)} />
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
                      collaboratorId={this.props.collaboratorId}
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

module.exports = withRouter(FormCollaborator);