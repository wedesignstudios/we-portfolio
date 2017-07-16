import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../../services/form_handlers');

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
    const { preSelected, sendCollaboratorData, attached, detach } = this.props;

    return (
      <div className="form-group row">
        <label className="col-sm-2">Project Collaborator(s): </label>
        <div className="col-sm-10">
          <div className="checkboxes-container form-control">
            {this.state.collaborators_data.map(collaborator =>
              <div className="form-check" key={collaborator.id}>
                <label className="form-check-label">
                  <input
                    className="form-check-input mr-2"
                    type="checkbox"
                    value={collaborator.id}
                    name="collaborators_ids"
                    checked={this.props.preSelected.includes(collaborator.id)}
                    onChange={(e) => FormHandlers.multiSelect(e, this, this.props.sendCollaboratorData)} />
                    {collaborator.name}
                  </label>
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = CollaboratorCheckboxes;