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
    const validURL = FormValidations.checkForValidURL(url);
    console.log('validURL: ', validURL)

    if(validURL === false) {
      _this.setState({
        urlErr: true,
        urlErrType: 'not valid'
      });
    } else if(!FormValidations.urlHasProtocol(validURL)) {
      console.log('prependURL: ', FormHandlers.prependURL(validURL));
    } else {
      console.log('validURL', validURL);
    }
  }

}

module.exports = FormHandlersValidations;