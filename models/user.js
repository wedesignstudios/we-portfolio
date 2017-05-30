const bookshelf = require('../db/bookshelf');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  duplicates: ['username']
});

module.exports = bookshelf.model('User', User);