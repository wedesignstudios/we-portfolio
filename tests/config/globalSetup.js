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
        'projects',
        'project_categories',
        'wp_posts',
        'wp_users',
        'wp_meta_descriptions'
      ];

module.exports = async () => {
  await trunc.truncateCascade(knex, arrOfTables)
  return knex.seed.run(['test']);
};
