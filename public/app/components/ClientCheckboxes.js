import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../services/form_handlers');

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
    const { preChecked, sendClientData, attached, detach } = this.props;

    return (
      <div id="clients-container">
        <label>Project Client(s): </label><br />
        <div className="checkboxes-container">
          {this.state.clients_data.map(client => 
            <div key={client.id}>
              <input 
                type="checkbox"
                value={client.id}
                name="clients_ids"
                checked={this.props.preChecked.includes(client.id)}
                onChange={(e) => FormHandlers.multiCheckboxChange(e, this, this.props.sendClientData)} />
              <label>{client.name}</label>
            </div>)}
        </div>        
      </div>
    );
  }
}

module.exports = ClientCheckboxes;