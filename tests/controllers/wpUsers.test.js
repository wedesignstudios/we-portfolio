const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset'),
      testGET = require('../helpers/api/httpGET');

beforeAll(async () => {
  await trunc.truncateCascade(knex, ['wp_users']);
  await idSeq.idSeqReset(knex, 'wp_users');
  return knex('wp_users').insert({'user_login': 'david', 'user_email': 'myemail@email.com', 'display_name': 'Full Name'});
});

testGET.httpGET('wp-users');
