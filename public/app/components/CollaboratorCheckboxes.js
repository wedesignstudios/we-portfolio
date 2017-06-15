import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../services/form_handlers');

class CollaboratorCheckboxes extends React.Component {
  constructor() {
    super();

    this.state = {
      collaborators_data: []
    }
  }

  componentDidMount() {
    fetch(`/api/collaborators`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          collaborators_data: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { preChecked, sendCollaboratorData, attached, detach } = this.props;

    return (
      <div id="collaborators-container">
        <label>Project Collaborator(s): </label><br />
        <div className="checkboxes-container">
          {this.state.collaborators_data.map(collaborator =>
            <div key={collaborator.id}>
              <input 
                type="checkbox"
                value={collaborator.id}
                name="collaborators_ids"
                checked={this.props.preChecked.includes(collaborator.id)}
                onChange={(e) => FormHandlers.multiCheckboxChange(e, this, this.props.sendCollaboratorData)} />
              <label>{collaborator.name}</label>
            </div>)}
        </div>
      </div>
    );
  }
}

module.exports = CollaboratorCheckboxes;