const testGET = require('../helpers/api/httpGET'),
      relatedModels = ['author', 'meta_description'];

testGET.httpGET('wp-posts');
testGET.httpGETByIdRelated('wp-posts', 'wp-post-name', relatedModels);
