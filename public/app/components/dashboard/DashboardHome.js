import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

class DashboardHome extends Component {
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
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <h1>WE Portfolio Dashboard</h1>
          <h3>Hi, {this.state.user[0].first_name}</h3>
        </div>
      </div>
    );
  }
}

module.exports = DashboardHome;