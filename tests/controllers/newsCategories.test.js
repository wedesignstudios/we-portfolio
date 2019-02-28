const testGET = require('../helpers/api/httpGET');

testGET.httpGET('news-categories');
testGET.httpGETRelated('news-categories', ['news_story']);
