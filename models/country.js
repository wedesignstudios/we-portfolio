const bookshelf = require('../db/bookshelf');

const Country = bookshelf.Model.extend({
  tableName: 'countries'
});

module.exports = bookshelf.model('Country', Country);