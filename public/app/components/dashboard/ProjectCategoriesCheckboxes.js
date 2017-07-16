import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../../services/form_handlers');

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
    const { preSelected, sendProjectCategoriesData, attached, detach } = this.props;

    return (
      <div className="form-group row">
        <label className="col-sm-2">Project Category/Categories: </label>
        <div className="col-sm-10">
          <div className="checkboxes-container form-control">
            {this.state.project_categories_data.map(category =>
              <div className="form-check" key={category.id}>
                <label className="form-check-label">
                  <input
                    className="form-check-input mr-2"
                    type="checkbox"
                    value={category.id}
                    name="project_categories_ids"
                    checked={this.props.preSelected.includes(category.id)}
                    onChange={(e) => FormHandlers.multiSelect(e, this, this.props.sendProjectCategoriesData)} />
                  {category.name}
                </label>
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ProjectCategoriesCheckboxes;