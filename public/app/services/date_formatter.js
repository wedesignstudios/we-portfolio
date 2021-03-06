const DateFormatter = {

  monthNames: function() {
    return(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    );
  },

  monthDayYear: function(dateObj) {
    let month = this.monthNames()[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
  },

  monthYear: function(dateObj) {
    let month = this.monthNames()[dateObj.getMonth()];
    let year = dateObj.getFullYear();

    return `${month} ${year}`;
  }

}

export default DateFormatter;
