import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';

const FormValidations = require('../../services/form_validations');

class GetCollaborators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaboratorsData: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: ''};
    }
      this.flashMessage = this.props.history.location.state.message;


  }

  componentDidMount() {
    fetch('/api/v1/collaborators')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          collaboratorsData: data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentWillUpdate(nextProps) {
    if(this.props.history.location.state !== undefined) {
      this.flashMessage = nextProps.history.location.state.message;

      if(this.props.history.location.state.message !== '') {
        setTimeout(() => FormValidations.resetFlashMessage(this), 3000);
      }
    }
  }

  render() {
    return(
      <div className="row m-0 justify-content-center">
        <div className="col-sm-6">

          <div className="container-fluid">
            <div className="row">
              <h2 className="font-weight-bold">All Collaborators</h2>
              <Link to={`${this.props.match.url}/create`} className="btn btn-primary ml-auto">Add New Collaborator</Link>
            </div>
            <div className="row">
              <hr className="col" />
            </div>

            {this.flashMessage ?
              <div className="alert alert-success">
                {this.flashMessage}
              </div> :
            null}

            <div className="row">
              {this.state.collaboratorsData.map(collaborator => {
                return(
                  <div className="col-sm-2 mb-4" key={collaborator.id}>
                    <div className="card line-height-1-25-rem">
                      <div className="card-block p-3">
                        <p className="card-title mb-2">
                          <Link to={`${this.props.match.url}/${collaborator.id}/update`} className="text-muted">
                            {collaborator.name}
                          </Link>
                        </p>
                      </div>
                      <div className="card-footer text-muted px-3 py-1">
                        <p className="card-text mb-0">
                          <small className="text-muted">
                            {collaborator.address.length > 0 ?
                              `${collaborator.address[0].city}, ${collaborator.address[0].state}` :
                            <span className="font-italic">Please add address</span>}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = GetCollaborators;