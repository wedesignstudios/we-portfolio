import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormMailchimpSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FNAME: '',
      email_address: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

    fetch('/api/v1/mailchimp/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.text())
      .then(text => console.log(text))
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
                    className="mb-0 mr-2rem"
                    type="text"
                    name="FNAME"
                    placeholder="First Name"
                    value={this.state.FNAME}
                    onChange={this.handleInputChange} />

                  <input
                    className="mb-0 mr-2rem"
                    type="text"
                    name="email_address"
                    placeholder="Email"
                    value={this.state.email_address}
                    onChange={this.handleInputChange} />

                  <button
                    className="btn btn-primary ml-auto"
                    // disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}>
                    GO
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = FormMailchimpSignUp;
