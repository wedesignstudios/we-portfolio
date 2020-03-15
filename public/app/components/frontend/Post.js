import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import PostLayout from './PostLayout';
import NotFound from '../dashboard/NotFound';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      postData: '',
      dataFetched: true
    }
  }

  componentDidMount() {
    fetch(`/api/v1/wp-posts/${this.props.match.params.post_name}`)
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
    let { postData, dataFetched } = this.state,
        meta_description_fallback;

    if(postData.post_content) {
      meta_description_fallback = postData.post_content.replace(/<(?:.|\n)*?>/gm, '');
      if (meta_description_fallback.length > 155) {
        meta_description_fallback = meta_description_fallback.substring(0,155);
      }
    }
    return (
      <div
        id={`post-${postData.id}`}
        className="row justify-content-center mx-0">
          {dataFetched ? null : <NotFound />}
          {postData !== '' ? <PostLayout postData={postData} />: null}
        {postData !== '' ?
          <Helmet>
            <title>{postData.post_title}</title>
            <meta name="description" content={postData.meta_description ? postData.meta_description : meta_description_fallback} />
            <meta property="og:description" content={postData.meta_description ? postData.meta_description : meta_description_fallback} />
            <link rel="canonical" href={`https://wedesignstudios.com${this.props.match.url}`} />
            <meta property="og:url" content={`https://wedesignstudios.com${this.props.match.url}`} />
          </Helmet>
        : null}
      </div>
    );
  }
}

export default Post;
