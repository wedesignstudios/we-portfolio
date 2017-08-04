const bookshelf = require('../db/bookshelf');

const Project = require('./project');

const ProjectImagesSortOrder = bookshelf.Model.extend({
  tableName: 'project_images_sort_orders',
  hasTimestamps: true,
  project: function() {
    return this.belongsTo('Project', 'project_id');
  }
});

module.exports = bookshelf.model('ProjectImagesSortOrder', ProjectImagesSortOrder);