import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class FormAddress extends Component {
  constructor() {
    super();

    this.state = {
      allCities: [],
      allStates: [],
      allCountries: [],
      city: '',
      state: '',
      country: '',
      address_id: ''
    }
  }

  componentDidMount() {
    fetch('/api/addresses')
      .then((res) => res.json())
      .then((data) => {
        let arrCities = data.map(item => {
          return {value: item.city, label: item.city};
        });
        this.setState({
          allCities: arrCities
        });
      })
      .catch((err) => {
        console.error(err);
      });

    fetch('/api/states')
      .then((res) => res.json())
      .then((data) => {
        let arrStates = data.map(item => {
          return {value: item.code, label: item.name};
        });
        this.setState({
          allStates: arrStates
        })
      })
      .catch((err) => {
        console.log(err);
      });

    fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => {
        let arrCountries = data.map(item => {
          return {value: item.code, label: item.name};
        });
        this.setState({
          allCountries: arrCountries
        });
      })
      .catch((err) => {
        console.error(err);
      });

    if(this.props.clientId) {
      this.getClientOrCollaboratorData('client');
    }

    if(this.props.collaboratorId) {
      this.getClientOrCollaboratorData('collaborator');
    }
  }

  getClientOrCollaboratorData(model) {
    let modelId = model + 'Id';
    let models = model + 's';

    fetch(`/api/${models}/${this.props[modelId]}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.address.length > 0) {
          this.setState({
            city: data.address[0].city,
            state: data.address[0].state,
            country: data.address[0].country,
            address_id: data.address[0].id
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setSelectedCity(val) {
    this.setState({
      city: val ? val.value : ''
    });
  }

  setSelectedState(val) {
    this.setState({
      state: val ? val.value : ''
    });
  }

  setSelectedCountry(val) {
    this.setState({
      country: val ? val.value : ''
    });
  }

  selectOnBlurHandler(event, sendDataFunc, inputName) {
    const data = {[inputName]: this.state[inputName]};
    sendDataFunc(data, inputName);
  }

  render() {
    return(
      <div>
        <Select
          name="city"
          value={this.state.city}
          options={this.state.allCities}
          onChange={(val) => this.setSelectedCity(val)}
          onBlur={(e) => this.selectOnBlurHandler(e, this.props.sendAddressData, 'city')}
          placeholder="Select A City" />

        <Select
          name="state"
          value={this.state.state}
          options={this.state.allStates}
          onChange={(val) => this.setSelectedState(val)}
          onBlur={(e) => this.selectOnBlurHandler(e, this.props.sendAddressData, 'state')}
          placeholder="Select A State" />

          <Select
          name="country"
          value={this.state.country}
          options={this.state.allCountries}
          onChange={(val) => this.setSelectedCountry(val)}
          onBlur={(e) => this.selectOnBlurHandler(e, this.props.sendAddressData, 'country')}
          placeholder="Select A Country" />
      </div>
    );
  }
}

module.exports = FormAddress;