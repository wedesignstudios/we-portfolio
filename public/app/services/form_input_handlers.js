const FormValidations = require('./form_validations');

const FormHandlers = {

  handleOnChange: function(event, _this) {
    if(event._isAMomentObject) {
      FormHandlers.dateInputChange(event, _this);
    } else {
      FormHandlers.inputChange(event, _this);
    }
  },

  inputChange: function(event, _this) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    _this.setState({
      [name]: value
    });
  },

  dateInputChange: function(event, _this) {
    _this.setState({
      date: event,
      dateClear: true
    });

    if(FormValidations.isMomentObjectNull(event)) {
      _this.setState({dateErr: true});
    } else {
      _this.setState({dateErr: false});
    }
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
  }

};

module.exports = FormHandlers;