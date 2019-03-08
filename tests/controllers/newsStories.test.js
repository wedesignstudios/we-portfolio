const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      testGET = require('../helpers/api/httpGET'),
      testPOST = require('../helpers/api/httpPOST'),
      testPUT = require('../helpers/api/httpPUT'),
      testDELETE = require('../helpers/api/httpDELETE'),
      relatedModels = ['image', 'news_categories'],
      postData = {
                    'title': 'Test News Story',
                    'date': new Date,
                    'description': 'Interesting news story description.',
                    'news_categories_ids': [1, 2],
                    'image_id': '2'
                  },
      putData = {
                   'title': 'Updated Test News Story',
                   'date': new Date,
                   'description': 'Updated interesting news story description.'
                 };

beforeAll(async () => {
  return knex('images').where({ id: 1 }).update({ news_story_id: 1 });
})

testGET.httpGETRelated('news-stories', relatedModels);
testGET.httpGETByIdRelated('news-stories', 1, relatedModels);
testPOST.httpPOST('news-stories', postData);
testPUT.httpPUT('news-stories', 1, putData);
testDELETE.httpDELETE('news-stories', 1);
