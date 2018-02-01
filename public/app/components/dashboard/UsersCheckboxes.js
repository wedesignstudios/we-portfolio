import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../../services/form_handlers');

class UserCheckboxes extends React.Component {
  constructor() {
    super();

    this.state = {
      users_data: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/users`)
      .then((res) => res.json())
      .then((data) => {
        data = data.filter(user => user.id != 3);
        this.setState({
          users_data: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { preSelected, sendUsersData, attached, detach } = this.props;

    return (
      <div className="form-group row">
        <label className="col-sm-2">Project Primary Executor(s): </label>
        <div className="col-sm-10">
          <div className="checkboxes-container form-control">
            {this.state.users_data.map(user =>
              <div className="form-check" key={user.id}>
                <label className="form-check-label">
                  <input
                    className="form-check-input mr-2"
                    type="checkbox"
                    value={user.id}
                    name="users_ids"
                    checked={this.props.preSelected.includes(user.id)}
                    onChange={(e) => FormHandlers.multiSelect(e, this, this.props.sendUsersData)} />
                    {user.first_name} {user.last_name}
                  </label>
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = UserCheckboxes;