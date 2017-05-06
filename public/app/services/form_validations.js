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

  areAnyRequiredFieldsBlank: function(_this, nextState) {
    let reqFields = _this.requiredFields;

    for(let i=0; i<reqFields.length; i++) {
      if(nextState[reqFields[i]] === '') {
        return true;
      }
    }
    return false;
  },

  checkRequiredField: function(event, _this) {
    const target = event.target;
    const value = target.value;
    const fieldName = target.name;
    const err = event.target.name + 'Err';
    const errType = err + 'Type';

    if(FormValidations.isFieldBlank(event)) {
      _this.setState({
        [err]: true,
        [errType]: 'blank'
      });
    } else {
      _this.setState({[err]: false});
    }

    if(fieldName === 'url' && value) {
      if(!FormValidations.checkForValidURL(value)) {
        _this.setState({
          [err]: true,
          [errType]: 'not valid'
        })
      };
    }
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
  }

}

module.exports = FormValidations;