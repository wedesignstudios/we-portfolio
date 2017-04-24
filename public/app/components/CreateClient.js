import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class CreateClient extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      url: '',
      nameErr: false,
      urlErr: false
    }
    
  }

  render() {
    return (
      <div>
        <h3>Add A New Client</h3>
        <form>
          <div>
            <label>Client Name: </label>
            <input type="text" name="name" />
            {this.state.nameErr ? <div id="client-name-validation-error" style={{color: 'red'}}>Name can not be blank. Please enter a project name.</div> : null}
          </div>
          <div>
            <label>Website: </label>
            <input type="text" name="url" />
            {this.state.urlErr ? <div id="client-url-validation-error" style={{color: 'red'}}>Website can not be blank. Please enter a project name.</div> : null}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = CreateClient;