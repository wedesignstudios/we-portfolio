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
    fetch(`/api/news-categories`)
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
    const { preChecked, sendNewsCategoriesData, attached, detach } = this.props;

    return(
      <div id="news-categories-container">
        <label>News Category/Categories</label><br />
        <div className="checkboxes-container">
          {this.state.news_categories_data.map(category =>
            <div key={category.id}>
              <input 
                type="checkbox"
                value={category.id}
                name="news_categories_ids"
                checked={this.props.preChecked.includes(category.id)}
                onChange={(e) => FormHandlers.multiCheckboxChange(e, this, this.props.sendNewsCategoriesData)} />
                <label>{category.name}</label>
            </div>)}
        </div>
      </div>
    )
  }

}

module.exports = NewsCategoriesCheckboxes;