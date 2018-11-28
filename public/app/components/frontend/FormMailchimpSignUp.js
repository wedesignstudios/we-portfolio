import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormMailchimpSignUp extends Component {
  render() {
    return (
      <div id="mc_signup_wrapper" className="col-10">
        <div className="row height-100 align-content-center">
          <div id="mc_signup_cta" className="col-12">
            <h4 className="text-center muli-reg">Sign Up For The WE Monthly Newsletter!</h4>
          </div>

          <div className="col-12">
            <form id="mc_signup_form">
              <div className="form-group row justify-content-center">
                <div className="col-5">
                  <input
                    className="mb-0"
                    type="text"
                    name="first_name"
                    /* value="" */
                    placeholder="First Name" />
                </div>

                <div className="col-5">
                  <input
                    className="mb-0"
                    type="text"
                    name="email"
                    /* value="" */
                    placeholder="Email" />
                </div>

                <div className="col-1">
                  <button
                    className="btn btn-primary"
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
