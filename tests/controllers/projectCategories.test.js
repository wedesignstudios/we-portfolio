const testGET = require('../helpers/api/httpGET');

testGET.httpGET('project-categories');
testGET.httpGETRelated('project-categories', ['projects']);
