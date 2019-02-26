const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset'),
      testGET = require('../helpers/api/httpGET'),
      testPOST = require('../helpers/api/httpPOST'),
      testPUT = require('../helpers/api/httpPUT'),
      relatedModels = ['projects', 'address'],
      postData = {'name': 'POST Client Inc.', 'url': 'https://postclientinc.com'},
      putData = {'name': 'PUT Client LLC', 'url': 'https://putclientinc.com'};

beforeAll(async () => {
  await trunc.truncateCascade(knex, ['clients']);
  await idSeq.idSeqReset(knex, 'clients');
  return knex('clients').insert({'name': 'My Client LLC', 'url': 'https://myclientllc.com'});
});

testGET.httpGETRelated('clients', relatedModels);
testGET.httpGETByIdRelated('clients', 1, relatedModels);
testPOST.httpPOST('clients', postData);
testPUT.httpPUT('clients', 1, putData);
