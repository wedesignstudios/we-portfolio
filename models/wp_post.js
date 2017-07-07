const bookshelf = require('../db/bookshelf');

const WPUser = require('./wp_user');

const WPPost = bookshelf.Model.extend({
  tableName: 'wp_posts',
  hasTimestamps: true,
  author: function() {
    return this.belongsTo('WPUser', 'post_author');
  }
});

module.exports = bookshelf.model('WPPost', WPPost);