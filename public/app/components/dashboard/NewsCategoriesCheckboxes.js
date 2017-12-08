import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../../services/form_handlers');

class NewsCategoriesCheckboxes extends React.Component {
  constructor() {
    super();

    this.state = {
      news_categories_data: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/news-categories`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          news_categories_data: data
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

  render() {
    const { preSelected, sendNewsCategoriesData, attached, detach } = this.props;

    return(
      <div className="form-group row">
        <label className="col-sm-2">News Category/Categories</label><br />
        <div className="col-sm-10">
          <div className="checkboxes-container form-control">
            {this.state.news_categories_data.map(category =>
              <div className="form-check" key={category.id}>
                <label className="form-check-label">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  value={category.id}
                  name="news_categories_ids"
                  checked={this.props.preSelected.includes(category.id)}
                  onChange={(e) => FormHandlers.multiSelect(e, this, this.props.sendNewsCategoriesData)} />
                  {category.name}
                </label>
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = NewsCategoriesCheckboxes;