import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const DateFormatter = require('../../services/date_formatter');

class PostLayout extends Component {
  constructor(props) {
    super(props);
    
    this.title = this.props.postData.post_title;
    this.date = new Date(this.props.postData.post_date);
    this.author = this.props.postData.author.display_name;
    this.content = this.props.postData.post_content;
  }

  render() {
    return(
      <div>
        <h3>{this.title}</h3>
        <p>{DateFormatter.monthDayYear(this.date)}</p>
        <p>{this.author}</p>
        <div dangerouslySetInnerHTML={{__html: this.content}} />
      </div>
    );
  }
}

module.exports = PostLayout;