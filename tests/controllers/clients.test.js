const testGET = require('../helpers/api/httpGET'),
      testPOST = require('../helpers/api/httpPOST'),
      testPUT = require('../helpers/api/httpPUT'),
      testDELETE = require('../helpers/api/httpDELETE'),
      relatedModels = ['projects', 'address'],
      postData = {'name': 'POST Client Inc.', 'url': 'https://postclientinc.com'},
      putData = {'name': 'PUT Client LLC', 'url': 'https://putclientinc.com'};

testGET.httpGETRelated('clients', relatedModels);
testGET.httpGETByIdRelated('clients', 1, relatedModels);
testPOST.httpPOST('clients', postData);
testPUT.httpPUT('clients', 1, putData);
testDELETE.httpDELETE('clients', 1);
