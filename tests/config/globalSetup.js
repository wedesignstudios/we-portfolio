const config = require('../../knexfile'),
      knex = require('knex')(config['test']);

module.exports = async () => {
  return knex.seed.run(['test']);
};
