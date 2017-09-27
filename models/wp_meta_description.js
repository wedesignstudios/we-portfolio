const bookshelf = require('../db/bookshelf');

const WPPost = require('./wp_post');

const WPMeta = bookshelf.Model.extend({
  tableName: 'wp_meta_descriptions',
  hasTimestamps: true,
  post: function() {
    return this.belongsTo('WPPost');
  }
});

module.exports = bookshelf.model('WPMeta', WPMeta);