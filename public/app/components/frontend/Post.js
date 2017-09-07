import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const PostLayout = require('./PostLayout');
const NotFound = require('../dashboard/NotFound');

class Post extends Component {
  constructor() {
    super();

    this.state = {
      postData: '',
      dataFetched: true
    }
  }

  componentDidMount() {
    fetch(`/api/wp-posts/${this.props.match.params.post_name}`)
      .then(res => res.json())
      .then(data => {
        if(data) {
          this.setState({
            postData: data
          });
        } else {
          this.setState({
            dataFetched: false
          });
        }
      })
  }

  render() {
    let { margin } = this.props;
    let { postData, dataFetched } = this.state;
    return (
      <div
        id={`post-${postData.id}`}
        className="row justify-content-center mx-0"
        style={{marginTop: margin}} >
          {dataFetched ? null : <NotFound />}
          {postData !== '' ? <PostLayout postData={postData} />: null}
      </div>
    );
  }
}

module.exports = Post;