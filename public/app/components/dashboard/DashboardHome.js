import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

class DashboardHome extends Component {
  constructor() {
    super();

    this.state = {
      user: ''
    }
  }

  componentDidMount() {
    fetch('/api/v1/user-data', {credentials: 'include'})
      .then(res => res.json())
      .then(data => this.setState({user: data}))
      .catch(err => console.error(err));
  }

  render() {
    if(!this.state.user) { return null}
    return(
      <div className="row m-0 justify-content-center">
        <div className="col-sm-6">

          <div className="container-fluid">
            <div className="row">
              <h2 className="font-weight-bold">WE Portfolio Dashboard</h2>
            </div>
            <div className="row">
              <hr className="col" />
            </div>
            <div className="row">
              <h5>Hi, {this.state.user[0].first_name}</h5>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = DashboardHome;