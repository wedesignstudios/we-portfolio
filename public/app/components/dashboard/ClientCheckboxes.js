import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../../services/form_handlers');

class ClientCheckboxes extends React.Component {
  constructor() {
    super();

    this.state = {
      clients_data: []
    }
  }

  componentDidMount() {
    fetch(`/api/clients`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          clients_data: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { preSelected, sendClientData, attached, detach } = this.props;

    return (
      <div className="form-group row">
        <label className="col-sm-2">Project Client(s): </label>
        <div className="col-sm-10">
          <div className="checkboxes-container form-control">
            {this.state.clients_data.map(client =>
              <div className="form-check" key={client.id}>
                <label className="form-check-label">
                  <input
                    className="form-check-input mr-2"
                    type="checkbox"
                    value={client.id}
                    name="clients_ids"
                    checked={this.props.preSelected.includes(client.id)}
                    onChange={(e) => FormHandlers.multiSelect(e, this, this.props.sendClientData)} />
                    {client.name}
                  </label>
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ClientCheckboxes;