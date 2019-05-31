const config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      testGET = require('../helpers/api/httpGET'),
      testPOST = require('../helpers/api/httpPOST'),
      testPUT = require('../helpers/api/httpPUT'),
      testDELETE = require('../helpers/api/httpDELETE'),
      relatedModels = [
        'images',
        'feature_image',
        'users',
        'clients',
        'collaborators',
        'project_categories',
        'project_images_sort_order'
      ],
      postData = {
        "name": "Test Project 2",
        "date": new Date,
        "result_statement": "Nulla et risus eget quam facilisis ullamcorper ac eu justo.",
        "description": "Vestibulum aliquam eleifend ante id interdum.",
        "visible": true,
        "images_ids": [3],
        "clients_ids": [1],
        "collaborators_ids": [1],
        "project_categories_ids": [1, 4],
        "users_ids": [1],
        "feature_image": { id: 2 },
        "image_sort_order": [3]
      },
      putData = {
        "name": "Test Project 1 Update",
        "result_statement": "Fusce posuere ipsum molestie suscipit vulputate.",
        "description": "Donec sollicitudin a ipsum nec facilisis",
        "visible": false,
        "images_ids": [1],
        "feature_image": { id: 4 },
        "image_sort_order": [1]
      };

beforeAll(async () => {
  await knex('project_images_sort_orders').insert({ project_id: 1, images_order: [1] });
  return knex('project_feature_images').insert({ project_id: 1, image_id: 1, created_at: new Date, updated_at: new Date });
})

testGET.httpGET('projects');
testGET.httpGETByIdRelated('projects', 1, relatedModels);
testPOST.httpPOST('projects', postData);
testPUT.httpPUT('projects', 1, putData);
testDELETE.httpDELETE('projects', 2);
