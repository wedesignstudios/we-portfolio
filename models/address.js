const bookshelf = require('../db/bookshelf');

const Client = require('./client.js');
const Collaborator = require('./collaborator.js');

const Address = bookshelf.Model.extend({
  tableName: 'addresses',
  hasTimestamps: true,
  clients: function() {
    return this.belongsTo('Client');
  },
  collaborators: function() {
    return this.belongsTo('Collaborator');
  }
});

module.exports = bookshelf.model('Address', Address);