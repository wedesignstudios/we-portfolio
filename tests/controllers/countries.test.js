const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset'),
      testGET = require('../helpers/api/httpGET');

beforeAll(async () => {
  await trunc.truncate(knex, ['countries']);
  await idSeq.idSeqReset(knex, 'countries');
  return knex.seed.run(['test']);
});

testGET.httpGET('countries');
