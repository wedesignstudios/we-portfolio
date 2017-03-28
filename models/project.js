const bookshelf = require('../db/bookshelf');

const Client = require('./client');
const Collaborator = require('./collaborator');
const Image = require('./image');
const ProjectsClients = require('./projects_clients');
const ProjectsCollaborators = require('./projects_collaborators');

const Project = bookshelf.Model.extend({
  tableName: 'projects',
  hasTimestamps: true,
  duplicates: ['name'],
  clients: function() {
    return this.belongsToMany('Client').through('ProjectsClients');
  },
  collaborators: function() {
    return this.belongsToMany('Collaborator').through('ProjectsCollaborators');
  },
  images: function() {
    return this.hasMany('Image');
  }
}, {
  dependents: ['clients', 'collaborators', 'images']
});

module.exports = bookshelf.model('Project', Project);