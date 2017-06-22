const bookshelf = require('../db/bookshelf');

const Address = require('./address');
const AddressesClients = require('./addresses_clients');
const Project = require('./project');
const ProjectsClients = require('./projects_clients');

const Client = bookshelf.Model.extend({
  tableName: 'clients',
  hasTimestamps: true,
  duplicates: ['name'],
  projects: function() {
    return this.belongsToMany('Project').through('ProjectsClients');
  },
  address: function() {
    return this.belongsToMany('Address').through('AddressesClients');
  }
}, {
  dependents: ['projects', 'address']
});

module.exports = bookshelf.model('Client', Client);