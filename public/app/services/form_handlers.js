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

  successMessage: function(_this) {
    _this.setState({
      success: true
    });
    setTimeout(() => {_this.setState({success: false}) }, 2000);
  },

  successCallback: function(formID, _this) {
    FormHandlers.resetForm(formID, _this);
    FormHandlers.successMessage(_this);
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