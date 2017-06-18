const bookshelf = require('../db/bookshelf');

const Client = require('./client');
const Address = require('./address');

const AddressesClients = bookshelf.Model.extend({
  tableName: 'addresses_clients',
  hasTimestamps: true,
  address: function() {
    return this.belongsTo('Address');
  },
  client: function() {
    return this.belongsTo('Client');
  }
})

module.exports = bookshelf.model('AddressesClients', AddressesClients);