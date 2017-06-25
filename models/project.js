const bookshelf = require('../db/bookshelf');

const Client = require('./client');
const Collaborator = require('./collaborator');
const Image = require('./image');
const ProjectCategory = require('./project_category');
const ProjectsClients = require('./projects_clients');
const ProjectsCollaborators = require('./projects_collaborators');
const ProjectsProjectCategories = require('./projects_project_categories');

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
  },
  project_categories: function() {
    return this.belongsToMany('ProjectCategory').through('ProjectsProjectCategories');
  }
}, {
  dependents: ['clients', 'collaborators', 'images', 'project_categories']
});

module.exports = bookshelf.model('Project', Project);