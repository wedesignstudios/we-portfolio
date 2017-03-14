const bookshelf = require('../db/bookshelf');

const Project = require('./project.js');
const Address = require('./address.js');

const Collaborator = bookshelf.Model.extend({
  tableName: 'collaborators',
  hasTimestamps: true,
  projects: function() {
    return this.belongsToMany('Project', 'projects_collaborators', 'project_id');
  },
  address: function() {
    return this.hasOne('Address');
  }
});

module.exports = bookshelf.model('Collaborator', Collaborator);