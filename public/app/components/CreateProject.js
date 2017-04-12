import React, { Component } from 'react'
import ReactDOM from 'react-dom'

function postRequest(state) {
  const data = state;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "http://localhost:3000/projects");
  xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(JSON.stringify(data));
}

class CreateProject extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      date: '',
      description: '',
      nameErr: false,
      dateErr: false,
      descriptionErr: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

    postRequest(this.state);
  }

  render() {
    return (
      <div>
        <h3>Add A New Project</h3>
        <form>
          <div>
            <label>Project Name: </label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
            {this.state.nameErr ? <div id="name-validation-error" style={{color: 'red'}}>Name can not be blank. Please enter a project name.</div> : null}
          </div>
          <div>
            <label>Date Completed: </label>
            <input type="text" name="date" value={this.state.date} onChange={this.handleInputChange} />
            {this.state.dateErr ? <div id="date-validation-error" style={{color: 'red'}}>Date can not be blank. Please enter a project completed date.</div> : null}
          </div>
          <div>
            <label>Description: </label>
            <input type="textfield" name="description" value={this.state.description} onChange={this.handleInputChange} />
            {this.state.descriptionErr ? <div id="description-validation-error" style={{color: 'red'}}>Description can not be blank. Please enter a project description.</div> : null}
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