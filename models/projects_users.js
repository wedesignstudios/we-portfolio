const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const User = require('./user');

const ProjectsUsers = bookshelf.Model.extend({
  tableName: 'projects_users',
  hasTimestamps: true,
  project: function() {
    return this.belongsTo('Project');
  },
  user: function() {
    return this.belongsTo('User');
  }
});

module.exports = bookshelf.model('ProjectsUsers', ProjectsUsers);