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

  validateHandleURL: function(url, _this) {
    var validURL = FormValidations.checkForValidURL(url);

    if(validURL === false) {
      _this.setState({
        urlErr: true,
        urlErrType: 'not valid'
      });
      return;
    } else if(!FormValidations.urlHasProtocol(validURL)) {
      validURL = FormHandlers.prependURL(validURL);
      _this.setState({
        url: validURL
      });
    }
  }

}

module.exports = FormHandlersValidations;