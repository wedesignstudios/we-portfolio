const bookshelf = require('../db/bookshelf');

const Collaborator = require('./collaborator');
const Address = require('./address');

const AddressesCollaborators = bookshelf.Model.extend({
  tableName: 'addresses_collaborators',
  hasTimestamps: true,
  address: function() {
    return this.belongsTo('Address');
  },
  collaborator: function() {
    return this.belongsTo('Collaborator');
  }
})

module.exports = bookshelf.model('AddressesCollaborators', AddressesCollaborators);