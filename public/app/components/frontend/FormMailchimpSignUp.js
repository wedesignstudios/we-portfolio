import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormValidations = require('../../services/form_validations');

class FormMailchimpSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FNAME: '',
      email_address: ''
    };

    this.requiredFields = ['FNAME', 'email_address'];
    this.requiredFieldsBlank = true;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.requiredFieldsBlank = FormValidations.areAnyRequiredFieldsBlank(this.requiredFields, nextState);

    this.state.messages ? this.setState({ messages: [] }) : null;

    return true;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitForm(event) {
    let data = {
      email_address: this.state.email_address,
      status: 'pending',
      merge_fields: { FNAME: this.state.FNAME }
    }

    event.preventDefault();
    FormValidations.trimData(this.state, this);

    if(this.state.email_addressErr && this.state.email_addressErrType === 'not valid') {
      return;
    }

    fetch('/api/v1/mailchimp/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        if(res.status === 200) {
          this.setState({
            success: true
          });
        } else {
          this.setState({
            success: false
          });
        }
        return res.text();
      })
      .then(text => this.setState({ messages: [text] }))
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div id="mc_signup_wrapper" className="col-10">
        <div className="row height-100 align-content-center">
          <div id="mc_signup_cta" className="col-12">
            <h3 className="text-center muli-bold mt-2 mb-3">Sign Up For The WE Monthly Newsletter!</h3>
          </div>

          <div className="col-12">
            <form id="mc_signup_form">
              <div className="form-group row justify-content-center">
                <div className="col-lg-9 col-sm-12 d-flex">
                  <input
                    className={this.state.FNAMEErr ? 'err mb-0 mr-2rem' : 'mb-0 mr-2rem'}
                    type="text"
                    name="FNAME"
                    placeholder={this.state.FNAMEErr ? 'First Name Can Not Be Blank' : 'First Name'}
                    value={this.state.FNAME}
                    onChange={this.handleInputChange}
                    onBlur={(e) => {FormValidations.checkField(e, this);}} />

                  <input
                    className={this.state.email_addressErr ? 'err mb-0 mr-2rem' : 'mb-0 mr-2rem'}
                    type="text"
                    name="email_address"
                    placeholder={this.state.email_addressErr && this.state.email_addressErrType === 'blank' ? 'Email Address Can Not Be Blank' : 'Email'}
                    value={this.state.email_address}
                    onChange={this.handleInputChange}
                    onBlur={(e) => {FormValidations.checkField(e, this);}} />

                  <button
                    className="btn btn-primary ml-auto"
                    disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}>
                    GO
                  </button>
                </div>
              </div>
            </form>
            <div id="form-messages" className="row justify-content-center">
              {this.state.email_addressErr && this.state.email_addressErrType === 'not valid' ?
                <p className="mb-0 text-danger">Email address is not valid. Please enter a valid email address.</p> :
                null}

              {this.state.messages ?
                this.state.messages.map(msg => {
                  return (
                    <p className="mb-0 text-danger">{msg}</p>
                  )
                }) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = FormMailchimpSignUp;
