const bookshelf = require('../db/bookshelf');

const Client = require('./client');
const Collaborator = require('./collaborator');
const Image = require('./image');
const User = require('./user');
const ProjectFeatureImage = require('./project_feature_images');
const ProjectCategory = require('./project_category');
const ProjectsClients = require('./projects_clients');
const ProjectsCollaborators = require('./projects_collaborators');
const ProjectsUsers = require('./projects_users');
const ProjectsProjectCategories = require('./projects_project_categories');
const ProjectImagesSortOrder = require('./project_images_sort_order');

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
  feature_image: function() {
    return this.hasOne('ProjectFeatureImage');
  },
  project_categories: function() {
    return this.belongsToMany('ProjectCategory').through('ProjectsProjectCategories');
  },
  project_images_sort_order: function() {
    return this.hasOne('ProjectImagesSortOrder');
  },
  users: function() {
    return this.belongsToMany('User').through('ProjectsUsers');
  }
}, {
  dependents: ['clients', 'collaborators', 'images', 'project_categories', 'project_images_sort_order', 'feature_image', 'users']
});

module.exports = bookshelf.model('Project', Project);