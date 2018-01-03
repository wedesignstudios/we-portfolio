import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;
const DateFormatter = require('../../services/date_formatter');

class PostLayout extends Component {
  constructor(props) {
    super(props);
    
    this.title = this.props.postData.post_title;
    this.date = new Date(this.props.postData.post_date);
    this.author = this.props.postData.author.display_name;
    this.content = this.props.postData.post_content;
  }

  scrollToTop() {
    scroll.scrollToTop({duration: 1000});
  }

  render() {
    return(
      <div className="wp-content-container col-8 container p-0">
        <h2 className="text-uppercase letter-spacing-point125-rem muli-bold">{this.title}</h2>
        <hr className="hr-point7rem mb-4" />
        <p className="m-0">{DateFormatter.monthDayYear(this.date)}</p>
        <p className="m-0 mb-4">{this.author}</p>
        <div className="row m-0">
          <div
            id="wp-post-content"
            className="col-12 p-0"
            dangerouslySetInnerHTML={{__html: this.content}} />
        </div>
        <p className="text-center py-4 muli-bold">
          <span
            className="back-to-top"
            style={{cursor: 'pointer'}}
            onClick={this.scrollToTop} >
            BACK TO TOP
          </span>
        </p>
      </div>
    );
  }
}

module.exports = PostLayout;