const FormValidations = require('./form_validations');
const _groupBy = require('lodash/groupBy');
const _includes = require('lodash/includes');

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

  makeTitleCase: function(event, _this) {
    const target = event.target;
    const name = target.name;
    var value = this.titleCase(target.value);

    _this.setState({
      [name]: value
    })
  },

  multiSelect: function(event, _this, sendDataFunc) {
    const target = event.target;
    const name = target.name;
    const value = target.value ? parseInt(target.value) : parseInt(target.id);
    var selected = _this.props.preSelected;
    var attached = _this.props.attached;
    var detach = _this.props.detach;
    var toAttach = _this.props.toAttach;
    var toAttachImgUrls = _this.props.toAttachImgUrls;

    this.attachDetachValue(attached, value, detach, toAttach);

    if(name === 'image_ids') {
      this.attachDetachImage(target, attached, toAttachImgUrls);
    }

    this.selectValue(selected, value);

    sendDataFunc(this.selectObj(selected, attached, toAttach, detach, toAttachImgUrls), name);
  },

  attachDetachValue: function(attached, value, detach, toAttach) {
    if(attached.includes(value)) {
      let index = detach.indexOf(value);
      detach.includes(value) ? detach.splice(index, 1) : detach.push(value);
      return detach;
    } else {
      let index = toAttach.indexOf(value);
      toAttach.includes(value) ? toAttach.splice(index, 1) : toAttach.push(value);
      return toAttach;
    }
  },

  attachDetachImage: function(target, attached, toAttachImages) {
    let url = target.src;
    let id = parseInt(target.id);
    let image = {id: id, url: url};
    let toAttachGroups = _groupBy(toAttachImages, 'id');

    if(toAttachImages && toAttachGroups[id]) {
      let index = toAttachImages.findIndex(i => i.id === id);
      toAttachImages.splice(index, 1);
    } else {
      if(!attached.includes(id)) {
        toAttachImages.push(image);
      }
    }
    return toAttachImages;
  },

  selectValue: function(selected, value) {
    if(selected && selected.includes(value)) {
      let index = selected.indexOf(value);
      selected.splice(index, 1);
    } else {
      selected ? selected.push(value) : null;
    }
    return selected;
  },

  selectObj: function(selected, attached, toAttach, detach, toAttachImgUrls) {
    if(toAttachImgUrls && toAttachImgUrls.length > 0) {
      return {
        toAttachImgUrls: toAttachImgUrls,
        attached: attached,
        toAttach: toAttach,
        detach: detach
      }
    } else {
      return {
        selected: selected,
        attached: attached,
        toAttach: toAttach,
        detach: detach
      }
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
        let errorArr = prevState.submitError.slice();
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
      return str.split(' ').map(word => {
        if(word !== '' && !word.startsWith('Mc') && !word.startsWith('Mac')) {
          word = word.toLowerCase();
          return word.replace(word[0], word[0].toUpperCase());
        } else {
          return word;
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