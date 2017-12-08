import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';
import 'whatwg-fetch';

const FormHandlers = require('../../services/form_handlers');

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
    fetch('/api/v1/addresses')
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

    fetch('/api/v1/states')
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

    fetch('/api/v1/countries')
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

  checkIsValidNewOption(val) {
    let regex = /[a-zA-Z\u00C0-\u00FC]/g;
    let numSpecCharsRegex = /[\u0000-\u001f\u0021-\u0040\u005b-\u0060\u007b-\u00bf]/g;

    if(numSpecCharsRegex.test(val.label) || val.label === undefined || val.label === '') {
      return false
    }
    return true
  }

  selectOnBlurHandler(event, sendDataFunc, inputName) {
    var data = {[inputName]: this.state[inputName]};

    if(inputName === 'city') {
      let cityTitleCase = FormHandlers.titleCase(this.state.city);
      data = {city: cityTitleCase};
    }
    sendDataFunc(data, inputName);
  }

  createNewOption(val) {
    if(val.label !== undefined) {
      let inputValue = val.label;
      inputValue = FormHandlers.titleCase(inputValue);
      return {
        value: inputValue,
        label: inputValue
      }
    };
    return {
      value: val.label,
      label: val.label
    }
  }

  createPromptText(val) {
    if(val !== undefined) {
      return `Create new city: ${val}`;
    }
    return 'Type to add a new city.';
  }

  render() {
    return(
      <div>
        <Select.Creatable
          name="city"
          className="mb-3"
          value={this.state.city}
          options={this.state.allCities}
          onChange={(val) => this.setSelectedCity(val)}
          onBlur={(e) => this.selectOnBlurHandler(e, this.props.sendAddressData, 'city')}
          onFocus={(e) => FormHandlers.preventSpaceKey(e)}
          isValidNewOption={val => this.checkIsValidNewOption(val)}
          newOptionCreator={val => this.createNewOption(val)}
          promptTextCreator={val => this.createPromptText(val)}
          placeholder="Select/Enter A City" />

        <Select
          name="state"
          className="mb-3"
          value={this.state.state}
          options={this.state.allStates}
          onChange={(val) => this.setSelectedState(val)}
          onBlur={(e) => this.selectOnBlurHandler(e, this.props.sendAddressData, 'state')}
          placeholder="Select A State" />

          <Select
          name="country"
          className="mb-3"
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