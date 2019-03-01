const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      arrOfTables = [
        'addresses',
        'clients',
        'collaborators',
        'images',
        'news_categories',
        'news_stories',
        'project_categories',
        'wp_users'
      ];

module.exports = async () => {
  await trunc.truncateCascade(knex, arrOfTables)
  return knex.seed.run(['test']);
};