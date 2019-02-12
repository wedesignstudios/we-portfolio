const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset'),
      testGET = require('../helpers/api/httpGET');

beforeAll(async () => {
  await trunc.truncateCascade(knex, ['addresses']);
  await idSeq.idSeqReset(knex, 'addresses');
  return knex('addresses').insert({'city': 'Austin', 'state': 'TX', 'country': 'US'});
});

testGET.httpGET('addresses');
