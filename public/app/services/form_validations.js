const FormValidations = {

  isFieldBlank: function(event) {
    const target = event.target;
    const value = target.value;

    return !value;
  },

  isMomentObjectNull: function(event) {
    const dateMoment = event;

    return dateMoment === null;
  },

  isRequiredField: function(event, reqFieldsArr) {
    const fieldName = event.target.name;

    return reqFieldsArr.includes(fieldName);
  },

  areAnyRequiredFieldsBlank: function(reqFieldsArr, nextState) {
    for(let i=0; i<reqFieldsArr.length; i++) {
      if(nextState[reqFieldsArr[i]] === '' || nextState[reqFieldsArr[i]].length < 1) {
        return true;
      }
    }
    return false;
  },

  checkField: function(event, _this) {
    const target = event.target;
    const value = target.value;
    const fieldName = target.name;
    const err = event.target.name + 'Err';
    const errType = err + 'Type';
    const isRequired = FormValidations.isRequiredField(event, _this.requiredFields);

    if(FormValidations.isFieldBlank(event) && isRequired) {
      _this.setState({
        [err]: true,
        [errType]: 'blank'
      });
    } else {
      _this.setState({
        [err]: false,
        [errType]: null
      });
    }

    if(fieldName === 'url' && value) {
      if(!FormValidations.checkForValidURL(value)) {
        _this.setState({
          [err]: true,
          [errType]: 'not valid'
        })
      } else {
        _this.setState({
          [err]: false,
          [errType]: null
        });
      };
    }

    if(fieldName === 'email_address' && value) {
      if(!FormValidations.checkForValidEmail(value)) {
        _this.setState({
          [err]: true,
          [errType]: 'not valid'
        })
      } else {
        _this.setState({
          [err]: false,
          [errType]: null
        });
      };
    }
  },

  clearErrsIfNoneBeforeOnBlur: function(_this, errArr) {
    let clearErrObj = {};
    let stateErrArr = errArr.map(err => {return _this.state[err]});

    errArr.forEach(err => {clearErrObj[err] = false});

    if(_this.requiredFieldsBlank === false && stateErrArr.includes(true)) {
      _this.setState(clearErrObj);
    }
  },

  resetFlashMessage: function(_this) {
    _this.props.history.push(location, {message: ''});
  },

  trimData: function(stateObj, _this) {
    let keys = Object.keys(stateObj);

    for(let i=0; i<keys.length; i++) {
      let data = stateObj[keys[i]];

      if(typeof data === 'string') {
        _this.setState({
          [keys[i]]: data.trim()
        });
      }
    }
  },

  urlHasProtocol: function(url) {
    if(typeof url !== 'string') {
      return 'Function parameter is not a string.';
    }
    return (url.startsWith('http://') || url.startsWith('https://'));
  },

  checkForValidURL: function (url) {
    const result = url.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?\.[^\s0-9]{2,}|(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?\.[^\s0-9]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?\.[^\s0-9]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]?\.[^\s0-9]{2,})/g);

    if(result === null) {
      return false;
    } else {
      return result.join();
    }
  },

  checkForValidEmail: function(email_address) {
    let result = email_address.match(/\S+@\S+\.\S+/);

    if(result === null) {
      return false;
    }

    return true;
  }

}

export default FormValidations;
