const testGET = require('../helpers/api/httpGET'),
      testPOST = require('../helpers/api/httpPOST'),
      testPUT = require('../helpers/api/httpPUT'),
      testDELETE = require('../helpers/api/httpDELETE'),
      relatedModels = ['projects', 'address'],
      postData = {'name': 'POST Collaborator Inc.', 'url': 'https://postcollaboratorinc.com'},
      putData = {'name': 'PUT Collaborator LLC', 'url': 'https://putcollaboratorinc.com'};

testGET.httpGETRelated('collaborators', relatedModels);
testGET.httpGETByIdRelated('collaborators', 1, relatedModels);
testPOST.httpPOST('collaborators', postData);
testPUT.httpPUT('collaborators', 1, putData);
testDELETE.httpDELETE('collaborators', 2);
