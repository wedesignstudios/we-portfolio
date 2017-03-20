const bookshelf = require('../db/bookshelf');

const Client = require('./client');
const Collaborator = require('./collaborator');

const Address = bookshelf.Model.extend({
  tableName: 'addresses',
  hasTimestamps: true,
  clients: function() {
    return this.belongsTo('Client');
  },
  collaborators: function() {
    return this.belongsTo('Collaborator');
  }
}, {
  dependents: ['clients', 'collaborators']
});

module.exports = bookshelf.model('Address', Address);