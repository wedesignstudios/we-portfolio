import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class GetClients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientsData: []
    }

    if(this.props.history.location.state === undefined) {
      this.props.history.location.state = {message: 'No message.'};
      this.flashMessage = this.props.history.location.state.message;
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

  componentWillUpdate(nextProps) {
    this.flashMessage = nextProps.history.location.state.message;
  }

  render() {
    return(
      <div>
        <p>Message: {this.flashMessage}</p>
        <h3>All Clients</h3>
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