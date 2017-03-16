const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const Client = require('./client');

const ProjectsClients = bookshelf.Model.extend({
  tableName: 'projects_clients',
  hasTimestamps: true,
  project: function() {
    return this.belongsTo('Project');
  },
  client: function() {
    return this.belongsTo('Client');
  }
});

module.exports = bookshelf.model('ProjectsClients', ProjectsClients);