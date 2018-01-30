const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const ProjectsUsers = require('./projects_users');

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  duplicates: ['username'],
  projects: function() {
    return this.belongsToMany('Project').through('ProjectsUsers');
  }
});

module.exports = bookshelf.model('User', User);