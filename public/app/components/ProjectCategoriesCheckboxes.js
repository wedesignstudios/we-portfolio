import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../services/form_handlers');

class ProjectCategoriesCheckboxes extends React.Component {
  constructor() {
    super();

    this.state = {
      project_categories_data: []
    }
  }

  componentDidMount() {
    fetch(`/api/project-categories`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          project_categories_data: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { preChecked, sendProjectCategoriesData, attached, detach } = this.props;

    return (
      <div id="project-categories-container">
        <label>Project Category/Categories: </label><br />
        <div className="checkboxes-container">
          {this.state.project_categories_data.map(category => 
            <div key={category.id}>
              <input 
                type="checkbox"
                value={category.id}
                name="project_categories_ids"
                checked={this.props.preChecked.includes(category.id)}
                onChange={(e) => FormHandlers.multiCheckboxChange(e, this, this.props.sendProjectCategoriesData)} />
              <label>{category.name}</label>
            </div>)}
        </div>
      </div>
    );
  }
}

module.exports = ProjectCategoriesCheckboxes;