const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset'),
      testGET = require('../helpers/api/httpGET');

beforeAll(async () => {
  await trunc.truncateCascade(knex, ['news_categories']);
  await idSeq.idSeqReset(knex, 'news_categories');
  return knex('news_categories').insert({'name': 'Press Release'});
});

testGET.httpGET('news-categories');
testGET.httpGETRelated('news-categories', ['news_story']);