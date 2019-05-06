import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import FormValidations from '../../services/form_validations';

class GetClients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientsData: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: ''};
    }

    this.flashMessage = this.props.history.location.state.message;
  }

  componentDidMount() {
    fetch('/api/v1/clients')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          clientsData: data
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
        <div className="col-sm-9">

          <div className="container-fluid">
            <div className="row">
              <h2 className="font-weight-bold m-0">All Clients</h2>
              <Link to={`${this.props.match.url}/create`} className="btn btn-primary ml-auto">Add New Client</Link>
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
            {this.state.clientsData.map(client => {
              return (
              <div className="col-sm-3 mb-4" key={client.id}>
                <div className="card line-height-1-25-rem">
                  <div className="card-block p-3">
                    <p className="card-title mb-2">
                      <Link to={`${this.props.match.url}/${client.id}/update`} className="text-muted">
                        {client.name}
                      </Link>
                    </p>
                  </div>
                  <div className="card-footer text-muted px-3 py-1">
                    <p className="card-text mb-0">
                      <small className="text-muted">
                        {client.address.length > 0 ?
                          `${client.address[0].city}, ${client.address[0].state}` :
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

export default GetClients;
