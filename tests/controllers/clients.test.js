const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset'),
      testGET = require('../helpers/api/httpGET'),
      relatedModels = ['projects', 'address'];

beforeAll(async () => {
  await trunc.truncateCascade(knex, ['clients']);
  await idSeq.idSeqReset(knex, 'clients');
  return knex('clients').insert({'name': 'My Client LLC', 'url': 'https://myclientllc.com'});
});

testGET.httpGETRelated('clients', relatedModels);
testGET.httpGETByIdRelated('clients', 1, relatedModels);
