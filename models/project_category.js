const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const ProjectsProjectCategories = require('./projects_project_categories');

const ProjectCategory = bookshelf.Model.extend({
  tableName: 'project_categories',
  hasTimestamps: true,
  duplicates: ['name'],
  projects: function() {
    return this.belongsToMany('Project').through('ProjectsProjectCategories');
  }
}, {
  dependents: ['projects']
});

module.exports = bookshelf.model('ProjectCategory', ProjectCategory);