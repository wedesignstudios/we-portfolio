const bookshelf = require('../db/bookshelf');

const Project = require('./project');

const Image = bookshelf.Model.extend({
  tableName: 'images',
  hasTimestamps: true,
  duplicates: ['url'],
  project: function() {
    return this.belongsTo('Project', 'project_id');
  }
});

module.exports = bookshelf.model('Image', Image);