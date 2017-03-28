const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const Address = require('./address');
const ProjectsClients = require('./projects_clients');

const Client = bookshelf.Model.extend({
  tableName: 'clients',
  hasTimestamps: true,
  duplicates: ['name'],
  projects: function() {
    return this.belongsToMany('Project').through('ProjectsClients');
  },
  address: function() {
    return this.hasOne('Address');
  }
}, {
  dependents: ['projects']
});

module.exports = bookshelf.model('Client', Client);