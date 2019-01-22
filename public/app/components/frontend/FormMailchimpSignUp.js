import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormValidations = require('../../services/form_validations');
const classNames = require('classnames');

class FormMailchimpSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FNAME: '',
      email_address: '',
      messages: []
    };

    this.requiredFields = ['FNAME', 'email_address'];
    this.requiredFieldsBlank = true;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.requiredFieldsBlank = FormValidations.areAnyRequiredFieldsBlank(this.requiredFields, nextState);

    this.state.messages.length > 0 ? this.setState({ messages: [] }) : null;

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
            FNAME: '',
            email_address: '',
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
    let ctaClass = classNames({
          'text-center': true,
          'muli-bold': true,
          'mt-2': true,
          'mb-3': true
        }),
        fnameClass = classNames({
          'err': this.state.FNAMEErr,
          'mb-0': true,
          'mr-2rem': true
        }),
        emailClass = classNames({
          'err': this.state.email_addressErr,
          'mb-0': true,
          'mr-2rem': true
        }),
        formClass = classNames({
          'hide': this.state.success && this.state.messages.length > 0
        }),
        messageClass = classNames({
          'mb-0': true,
          'text-center': true,
          'text-danger': true
        });

    return (
      <div id="mc_signup_wrapper" className="col-10">
        <div className="row height-100 align-content-center">
          <div id="mc_signup_cta" className="col-12 text-center">
            <img src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-black.svg" className="m-3" alt="WE eye logo" />
            {this.state.success && this.state.messages.length > 0 ?
              this.state.messages.map(msg => {
                return(
                  <h3 className={ctaClass}>{msg}</h3>
                )
              }) :
            <h3 className={ctaClass}>Sign Up For The WE Monthly Newsletter!</h3>
            }
          </div>

          <div className="col-12">
            <form id="mc_signup_form" className={formClass}>
              <div className="form-group row justify-content-center">
                <div className="col-lg-9 col-sm-12 d-flex flex-wrap flex-md-nowrap">
                  <input
                    className={fnameClass}
                    type="text"
                    name="FNAME"
                    placeholder={this.state.FNAMEErr ? 'First Name Is Required' : 'First Name'}
                    value={this.state.FNAME}
                    onChange={this.handleInputChange}
                    onBlur={(e) => {FormValidations.checkField(e, this);}} />

                  <input
                    className={emailClass}
                    type="text"
                    name="email_address"
                    placeholder={this.state.email_addressErr && this.state.email_addressErrType === 'blank' ? 'Email Address Is Required' : 'Email'}
                    value={this.state.email_address}
                    onChange={this.handleInputChange}
                    onBlur={(e) => {FormValidations.checkField(e, this);}} />

                  <button
                    className="btn btn-primary ml-md-auto"
                    disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}>
                    GO
                  </button>
                </div>
              </div>
            </form>
            <div id="form-messages" className="row justify-content-center">
              {this.state.email_addressErr && this.state.email_addressErrType === 'not valid' ?
                <p className={messageClass}>Email address is not valid. Please enter a valid email address.</p> :
                null}

              {this.state.messages.length > 0 && !this.state.success ?
                this.state.messages.map(msg => {
                  return (
                    <p className={messageClass}>{msg}</p>
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
