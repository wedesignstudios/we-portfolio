const bookshelf = require('../db/bookshelf');

const Client = require('./client');
const Collaborator = require('./collaborator');
const Image = require('./image');

const Project = bookshelf.Model.extend({
  tableName: 'projects',
  hasTimestamps: true,
  clients: function() {
    return this.belongsToMany('Client', 'projects_clients', 'client_id');
  },
  collaborators: function() {
    return this.belongsToMany('Collaborator', 'projects_collaborators', 'collaborator_id');
  },
  images: function() {
    return this.hasMany('Image');
  }
});

module.exports = bookshelf.model('Project', Project);