const bookshelf = require('../db/bookshelf');

const AddressesClients = require('./addresses_clients');
const AddressesCollaborators = require('./addresses_collaborators');
const Client = require('./client');
const Collaborator = require('./collaborator');

const Address = bookshelf.Model.extend({
  tableName: 'addresses',
  hasTimestamps: true,
  clients: function() {
    return this.belongsToMany('Client').through('AddressesClients');
  },
  collaborators: function() {
    return this.belongsToMany('Collaborator').through('AddressesCollaborators');
  }
});

module.exports = bookshelf.model('Address', Address);