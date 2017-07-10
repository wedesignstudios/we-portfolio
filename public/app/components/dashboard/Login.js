import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Login extends Component {

  render() {
    return (
      <div>
        <h1>Login</h1>
        <p><a href="/login/facebook">Facebook Login</a></p>
        <p><a href="/login/google">Google Login</a></p>
      </div>
    );
  }
}

module.exports = Login;