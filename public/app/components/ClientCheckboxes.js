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

  checkboxChange(event) {
    const target = event.target;
    const name = target.name;
    const value = parseInt(target.value);
    var checked = this.props.preChecked;
    var attached = this.props.attached;
    var detach = this.props.detach;
    var toAttach = this.props.toAttach;

    if(attached.includes(value)) {
      let index = detach.indexOf(value);
      detach.includes(value) ? detach.splice(index, 1) : detach.push(value);      
    } else {
      let index = toAttach.indexOf(value);      
      toAttach.includes(value) ? toAttach.splice(index, 1) : toAttach.push(value);
    }

    if(checked.includes(value)) {
      let index = checked.indexOf(value);
      checked.splice(index, 1);
    } else {
      checked.push(value);
    }

    this.props.sendClientData({
      checked: checked,
      attached: attached,
      toAttach: toAttach,
      detach: detach
    });    
  }

  render() {
    const { preChecked, sendClientData, attached, detach } = this.props;

    return (
      <div>
        <label>Project Client(s): </label>
        <div id="client-checkboxes-container">
          {this.state.clients_data.map(client => 
            <div key={client.id}>
              <input 
                type="checkbox"
                value={client.id}
                name="clients_ids"
                checked={this.props.preChecked.includes(client.id)}
                onChange={(e) => this.checkboxChange(e)} />
              <label>{client.name}</label>
            </div>)}
        </div>        
      </div>
    );
  }
}

module.exports = ClientCheckboxes;