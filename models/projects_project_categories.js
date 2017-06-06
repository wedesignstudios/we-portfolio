const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const ProjectCategory = ('./project_category');

const ProjectsProjectCategories = bookshelf.Model.extend({
  tableName: 'projects_project_categories',
  hasTimestamps: true,
  project: function() {
    return this.belongsTo('Project');
  },
  project_category: function() {
    return this.belongsTo('ProjectCategory');
  }
});

module.exports = bookshelf.model('ProjectsProjectCategories', ProjectsProjectCategories);