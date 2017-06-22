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
    return this.belongsToMany('Address').through('AddressesCollaborators');
  }
}, {
  dependents: ['projects', 'address']
});

module.exports = bookshelf.model('Collaborator', Collaborator);