import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormMailchimpSignUp extends Component {
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
                    name="first_name"
                    /* value="" */
                    placeholder="First Name" />

                  <input
                    className="mb-0 mr-2rem"
                    type="text"
                    name="email"
                    /* value="" */
                    placeholder="Email" />

                  <button
                    className="btn btn-primary ml-auto"
                    /*disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}*/>
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
