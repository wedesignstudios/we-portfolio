const bookshelf = require('../db/bookshelf');

const WPUser = require('./wp_user');
const WPMeta = require('./wp_meta_description');

const WPPost = bookshelf.Model.extend({
  tableName: 'wp_posts',
  hasTimestamps: true,
  author: function() {
    return this.belongsTo('WPUser', 'post_author');
  },
  meta_description: function() {
    return this.hasOne('WPMeta');
  }
});

module.exports = bookshelf.model('WPPost', WPPost);