import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Login extends Component {

  render() {
    return (
      <div id="login-card" className="row justify-content-center">
        <div className="col-10 col-lg-8 col-xl-6 container p-0 mb-5rem mt-5">
          <div className="card mx-auto">
            <img className="card-img-top p-5" src="https://we-portfolio.s3.amazonaws.com/we-eye-logo-black.svg" alt="WE eye logo" />
              <div className="card-block">
                <h5 className="muli-bold mb-4 letter-spacing-point05-rem">Login</h5>
                <p className="card-text"><a href="/login/facebook"><i className="fab fa-facebook-square"></i> Login with Facebook</a></p>
                <p className="card-text"><a href="/login/google"><i className="fab fa-google"></i> Login with Google</a></p>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
