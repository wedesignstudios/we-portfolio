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
      selectedCity: '',
      selectedState: '',
      selectedCountry: ''
    }

    this.setSelectedCity = this.setSelectedCity.bind(this);
  }

  componentDidMount() {
    fetch('/api/addresses')
      .then((res) => res.json())
      .then((data) => {
        let arrCities = data.map(item => {
          return {value: item.city, label: item.city};
        });
        let arrStates = data.map(item => {
          return {value: item.state, label: item.state};
        });
        this.setState({
          allCities: arrCities,
          allStates: arrStates
        });
      })
      .catch((err) => {
        console.error(err);
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
  }

  getOptions(columnName) {
    return fetch('/api/addresses')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let arr = data.map(item => {
          return {value: item[columnName], label: item[columnName]};
        });
        console.log(arr);
        return {options: arr};
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setSelectedCity(val) {
    this.setState({
      selectedCity: val ? val.value : ''
    });
  }

  setSelectedState(val) {
    this.setState({
      selectedState: val ? val.value : ''
    });
  }

  setSelectedCountry(val) {
    this.setState({
      selectedCountry: val ? val.value : ''
    });
  }

  render() {
    return(
      <div>
        <p>City: {this.state.selectedCity}</p>
        <p>State: {this.state.selectedState}</p>
        <Select
          name="selectedCity"
          value={this.state.selectedCity}
          options={this.state.allCities}
          onChange={(val) => this.setSelectedCity(val)}
          placeholder="Select a city" />

        <Select
          name="selectedState"
          value={this.state.selectedState}
          options={this.state.allStates}
          onChange={(val) => this.setSelectedState(val)}
          placeholder="Select a state" />

          <Select
          name="selectedCountry"
          value={this.state.selectedCountry}
          options={this.state.allCountries}
          onChange={(val) => this.setSelectedCountry(val)}
          placeholder="Select a country" />
      </div>
    );
  }
}

module.exports = FormAddress;