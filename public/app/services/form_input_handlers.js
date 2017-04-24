const FormHandlers = {

  inputChange: function(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  },

  dateInputChange: function(event) {
    this.setState({
      date: event,
      dateClear: true
    });
  }

};

module.exports = FormHandlers;