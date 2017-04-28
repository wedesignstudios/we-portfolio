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

  checkRequiredField: function(event) {
    const target = event.target;
    const value = target.value;
    const fieldName = target.name;
    const err = event.target.name + 'Err';

    if(FormValidations.isFieldBlank(event)) {
      this.setState({[err]: true});
    } else {
      this.setState({[err]: false});
    }
  },

  checkForBlanks: function() {
    const argArr = arguments[0];

    for(let i=0; i<argArr.length; i++) {
      var arg = argArr[i];
      var argStateValue = this.state[arg];
      var err = `${arg}Err`;

      if (!argStateValue) {
        this.setState({[err]: true});
      } else {
        this.setState({[err]: false});
      }
    }
  }

}

module.exports = FormValidations;