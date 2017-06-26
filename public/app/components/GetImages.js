import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const UpdateImage = require('./UpdateImage');

class GetImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: [],
      imageId: null,
      isUpdateImageOpen: false
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: 'No message.', messageError: []};
    }

    this.flashMessage = this.props.history.location.state.message;
    this.flashMessageError = this.props.history.location.state.messageError;

  }

  componentDidMount() {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          imageData: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
      console.log('HISTORY: ', this.props.history);
  }

  componentWillUpdate(nextProps) {
    this.flashMessage = nextProps.history.location.state.message;
    this.flashMessageError = nextProps.history.location.state.messageError;
  }

  openUpdateImage(event, imageId) {
    this.setState({
      imageId: imageId,
      isUpdateImageOpen: !this.state.isUpdateImageOpen
    });
  }

  closeUpdateImage(e) {
    this.setState({
      isUpdateImageOpen: !this.state.isUpdateImageOpen
    });
  }

  render() {
    return(
      <div>
        <p>Message: {this.flashMessage}</p>
        <p>Errors:</p>
        <div className="submit-message-error" style={{color: 'red'}}>
          <ul>
            {this.flashMessageError.map((err, i) => {
              return <li key={i}>{err}</li>
            })}
          </ul>
        </div>
        <Link to={`${this.props.match.url}/upload`}>Add New Image(s)</Link>
        <h3>All Images</h3>
        <div className="image-grid">
          {this.state.imageData.map(image =>
            <div key={image.id} className="image-grid-element">
              <img
                src={image.url}
                title={image.title}
                alt={image.alt}
                width="100%"
                onClick={(e) => this.openUpdateImage(e, image.id)} />
            </div>
          )}
        </div>
        {this.state.isUpdateImageOpen ? <UpdateImage imageId={this.state.imageId} isOpen={this.state.isUpdateImageOpen} onClose={(e) => this.closeUpdateImage(e)} /> : null}
      </div>
    );
  }
};

module.exports = GetImages;