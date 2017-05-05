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

  resetForm: function(formID) {
    const form = document.forms[formID];
    const formInputs = form.getElementsByTagName("input");

    for(let i=0; i<formInputs.length; i++) {
      formInputs[i].value = '';
    }
    this.setState(this.initialState);
  }

};

module.exports = FormHandlers;