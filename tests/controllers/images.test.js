const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      path = require('path'),
      imgPath = './public/images/test/testImg.jpg',
      imgPathParsed = path.parse(imgPath),
      testGET = require('../helpers/api/httpGET'),
      testPOST = require('../helpers/api/httpPOST'),
      testPUT = require('../helpers/api/httpPUT'),
      testDELETE = require('../helpers/api/httpDELETE'),
      relatedModels = [
        'project',
        'news_story',
        'feature_image_project'
      ],
      putData = {
        'title': 'Image title 1 update',
        'alt': 'Image title 1 update',
        'url': 'https://imageurl1update.com',
        'project_id': null,
        'index_page': true
      },
      deleteData = {
        url: 'https://we-portfolio.s3.amazonaws.com/' + imgPathParsed.base,
        orig_name: imgPathParsed.base
      };

beforeAll(async () => {
  return knex('images').where({ id: 1 }).update({ project_id: 1, news_story_id: 1 });
})

testGET.httpGETRelated('images', relatedModels);
testGET.httpGETByIdRelated('images', 1, relatedModels);
testPOST.httpPOSTImg('images', imgPath);
testPUT.httpPUT('images', 1, putData);
testDELETE.httpDELETEImg('images', 5, deleteData);
