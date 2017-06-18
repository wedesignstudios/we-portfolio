const bookshelf = require('../db/bookshelf');

const Address = require('./address');
const AddressesCollaborators = require('./addresses_collaborators');
const Project = require('./project');
const ProjectsCollaborators = require('./projects_collaborators');

const Collaborator = bookshelf.Model.extend({
  tableName: 'collaborators',
  hasTimestamps: true,
  duplicates: ['name'],
  projects: function() {
    return this.belongsToMany('Project').through('ProjectsCollaborators');
  },
  address: function() {
    return this.hasOne('Address').through('AddressesCollaborators', 'id', 'collaborator_id');
  }
}, {
  dependents: ['projects']
});

module.exports = bookshelf.model('Collaborator', Collaborator);