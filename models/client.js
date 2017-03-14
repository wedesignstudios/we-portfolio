const bookshelf = require('../db/bookshelf');

const Project = require('./project.js');
const Address = require('./address.js');

const Client = bookshelf.Model.extend({
  tableName: 'clients',
  hasTimestamps: true,
  projects: function() {
    return this.belongsToMany('Project', 'projects_clients', 'project_id');
  },
  address: function() {
    return this.hasOne('Address');
  }
});

module.exports = bookshelf.model('Client', Client);