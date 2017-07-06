const FormValidations = require('./form_validations');

const FormHandlers = {

  handleOnChange: function(event, _this) {    
    FormHandlers.inputChange(event, _this);    
  },

  inputChange: function(event, _this) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    _this.setState({
      [name]: value
    });
  },

  checkboxChange: function(event, _this) {
    const target = event.target;
    const name = target.name;

    _this.setState({
      [name]: !_this.state[name]
    });
  },

  multiCheckboxChange: function(event, _this, sendDataFunc) {
    const target = event.target;
    const name = target.name;
    const value = parseInt(target.value);
    var checked = _this.props.preChecked;
    var attached = _this.props.attached;
    var detach = _this.props.detach;
    var toAttach = _this.props.toAttach;

    if(attached.includes(value)) {
      let index = detach.indexOf(value);
      detach.includes(value) ? detach.splice(index, 1) : detach.push(value);
    } else {
      let index = toAttach.indexOf(value);
      toAttach.includes(value) ? toAttach.splice(index, 1) : toAttach.push(value);
    }

    if(checked.includes(value)) {
      let index = checked.indexOf(value);
      checked.splice(index, 1);
    } else {
      checked.push(value);
    }

    sendDataFunc({
      checked: checked,
      attached: attached,
      toAttach: toAttach,
      detach: detach
    }, name);
  },

  preventAllButShiftAndTab: function(event) {
    event.target.addEventListener('keydown', function(event) {
      let key = event.key;

      if(key !== 'Shift' && key !== 'Tab') {
        event.preventDefault();
      };
    });
  },

  preventSpaceKey: function(event) {
    event.target.addEventListener('keydown', function(event) {
      let key = event.key;

      if(key === ' ' && !event.target.value) {
        event.preventDefault();
      };
    });
  },

  prependURL: function(url) {
    return url = `http:\/\/${url}`;
  },

  resetDetached: function(_this, models) {
    models.forEach(model => {
      let model_ids_detach = model + '_ids_detach';

      _this.setState({
        [model_ids_detach]: []
      })
    })
  },

  resetToAttachIds: function(_this, models) {
    models.forEach(model => {
      let model_ids = model + '_ids';

      _this.setState({
        [model_ids]: []
      })
    })
  },

  resetForm: function(formID, _this) {
    const form = document.forms[formID];
    const formInputs = form.getElementsByTagName("input");

    for(let i=0; i<formInputs.length; i++) {
      formInputs[i].value = '';
    }
    _this.setState(_this.initialState);
  },

  setRedirectWithMessage: function(_this, location, errMessage, message) {
    let error;
    errMessage ? (error = errMessage) : (error = '');
    _this.props.history.push(location, {message: message, messageError: error});
  },

  setSubmitErrorMessage: function(_this, message) {
    _this.setState((prevState) => {
      if (typeof prevState.submitError === 'object') {
        let errorArr = prevState.submitError;
        errorArr.push(message);
        return {submitError: errorArr}
      };
      return {submitError: message};
    })
  },

  successMessage: function(_this) {
    _this.setState({
      submitSuccess: true
    });
    setTimeout(() => {_this.setState({submitSuccess: false}) }, 2000);
  },

  successCallback: function(formID, _this, location) {
    FormHandlers.resetForm(formID, _this);
  },

  titleCase: function(str) {
    return str.toLowerCase().split(' ').map(word => {
      if(word !== '') {
        return word.replace(word[0], word[0].toUpperCase());
      }
    }).join(' ');
  },

  updateAttached: function(_this, models) {
    models.forEach(model => {
      let model_ids = model + '_ids';
      let model_ids_attached = model_ids + '_attached';
      let model_ids_detach = model_ids + '_detach';

      let attached = _this.state[model_ids_attached];
      let didAttach = _this.state[model_ids];
      let didDetach = _this.state[model_ids_detach];

      if(didAttach) {
        didAttach.forEach(id => {
          attached.push(id);
        });
      }

      if(didDetach) {
        didDetach.forEach(id => {
          let index = attached.indexOf(id);
          attached.splice(index, 1);
        });
      }

      _this.setState({
        [model_ids_attached]: attached
      })
    })
  }

};

module.exports = FormHandlers;