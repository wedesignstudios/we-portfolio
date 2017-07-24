import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class NavAdmin extends Component {
  constructor() {
    super();

    this.state = {
      user: ''
    }
  }

  componentDidMount() {
    fetch('/api/user-data', {credentials: 'include'})
      .then(res => res.json())
      .then(data => this.setState({user: data}))
      .catch(err => console.error(err));
  }

  render() {
    if(!this.state.user) { return null}
    return(
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse row justify-content-center">
        <div className="col-6 collapse navbar-collapse">
          <span className="navbar-text mr-auto">Hi, {this.state.user[0].first_name}</span>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-outline-secondary" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

module.exports = NavAdmin;