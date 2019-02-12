const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset'),
      testGET = require('../helpers/api/httpGET');

beforeAll(async () => {
  await trunc.truncateCascade(knex, ['project_categories']);
  await idSeq.idSeqReset(knex, 'project_categories');
  return knex('project_categories').insert({'name': 'Graphic Design'});
});

testGET.httpGET('project-categories');
testGET.httpGETRelated('project-categories', ['projects']);
