const bookshelf = require('../db/bookshelf');

const WPPost = require('./wp_post');

const WPUser = bookshelf.Model.extend({
  tableName: 'wp_users',
  hasTimestamps: true,
  posts: function() {
    return this.hasMany('WPPost');
  }
});

module.exports = bookshelf.model('WPUser', WPUser);