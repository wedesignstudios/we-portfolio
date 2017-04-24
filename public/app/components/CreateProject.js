import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const DataActions = require('../data/actions');
const FormHandlers = require('../services/form_input_handlers');

class CreateProject extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      date: '',
      description: '',
      nameErr: false,
      dateErr: false,
      descriptionErr: false,
      dateClear: false,
    }

    this.handleInputChange = FormHandlers.inputChange;
    this.handleDateInputChange = FormHandlers.dateInputChange;
    this.validateForm = this.validateForm.bind(this);
  }  

  validateForm(event) {
    const {name, date, description} = this.state;
    event.preventDefault();

    if (!name || !date || !description) {
      !name ? this.setState({nameErr: true}) : this.setState({nameErr: false});
      !date ? this.setState({dateErr: true}) : this.setState({dateErr: false});
      !description ? this.setState({descriptionErr: true}) : this.setState({descriptionErr: false});

      return;
    } else {
      this.setState({
        nameErr: false,
        dateErr: false,
        descriptionErr: false
      });
    }

    DataActions.postRequest(this.state, '/projects');
  }

  render() {
    return (
      <div>
        <h3>Add A New Project</h3>
        <form>
          <div>
            <label>Project Name: </label>
            <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleInputChange(e)} />
            {this.state.nameErr ? <div id="project-name-validation-error" style={{color: 'red'}}>Name can not be blank. Please enter a project name.</div> : null}
          </div>

          <div>
            <label>Date Completed: </label>
            <DatePicker 
                selected={this.state.date}
                value={this.state.date}
                name="date2"
                placeholderText="Click to select a date"
                popoverAttachment="top right"
                popoverTargetAttachment="top center"
                popoverTargetOffset="30px 0px"
                isClearable={this.state.dateClear}
                onChange={(e) => this.handleDateInputChange(e)} />
            {this.state.dateErr ? <div id="project-date-validation-error" style={{color: 'red'}}>Date can not be blank. Please enter a project completed date.</div> : null}
          </div>

          <div>
            <label>Description: </label>
            <input type="textfield" name="description" value={this.state.description} onChange={(e) => this.handleInputChange(e)} />
            {this.state.descriptionErr ? <div id="project-description-validation-error" style={{color: 'red'}}>Description can not be blank. Please enter a project description.</div> : null}
          </div>
          <div>
            <button onClick={this.validateForm}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = CreateProject;