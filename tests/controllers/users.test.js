const testGET = require('../helpers/api/httpGET'),
      relatedModels = ['projects'];

testGET.httpGET('users');
testGET.httpGETByIdRelated('users', 'testuser', relatedModels);
