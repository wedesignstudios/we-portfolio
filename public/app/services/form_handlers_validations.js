const FormHandlers = require('./form_handlers');
const FormValidations = require('./form_validations');

const FormHandlersValidations = {  

  handleDateOnChange: function(event, _this) {
    _this.setState({
      date: event
    });

    if(FormValidations.isMomentObjectNull(event)) {
      _this.setState({dateErr: true});
    } else {
      _this.setState({dateErr: false});
    }
  },

  checkRequiredURLField: function(event, _this) {
    if(event.target.value === 'http://') {
      FormHandlers.removePrependURL(event);      
    }
    FormValidations.checkRequiredField(event, _this);
  }

}

module.exports = FormHandlersValidations;