const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const Address = require('./address');
const ProjectsCollaborators = require('./projects_collaborators');

const Collaborator = bookshelf.Model.extend({
  tableName: 'collaborators',
  hasTimestamps: true,
  duplicates: ['name'],
  projects: function() {
    return this.belongsToMany('Project').through('ProjectsCollaborators');
  },
  address: function() {
    return this.hasOne('Address');
  }
}, {
  dependents: ['projects']
});

module.exports = bookshelf.model('Collaborator', Collaborator);