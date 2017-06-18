import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class GetClients extends Component {
  constructor() {
    super();

    this.state = {
      clientsData: []
    }
  }

  componentDidMount() {
    fetch('/api/clients')
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

  render() {
    return(
      <div>
        <h3>Get All Clients</h3>
          <div>
            {this.state.clientsData.map(client =>
              <div key={client.id}><Link to={`${this.props.match.url}/${client.id}`}>{client.name}</Link></div>
            )}
          </div>
      </div>
    );
  }
}

module.exports = GetClients;