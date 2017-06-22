const bookshelf = require('../db/bookshelf');

const State = bookshelf.Model.extend({
  tableName: 'states'
});

module.exports = bookshelf.model('State', State);