const request = require('supertest'),
      app = require('../../index'),
      config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset');

beforeAll(async () => {
  await trunc.truncateCascade(knex, ['news_categories']);
  await idSeq.idSeqReset(knex, 'news_categories');
  return knex('news_categories').insert({'name': 'Press Release'});
});

describe('GET /news-categories', () => {
  it('responds with 200 status code', (done) => {
    request(app)
      .get('/api/v1/news-categories')
      .expect(200, done);
  });
  it('responds with a JSON object', (done) => {
    request(app)
      .get('/api/v1/news-categories')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, done);
  });
  it('responds with a JSON object containing data', (done) => {
    request(app)
      .get('/api/v1/news-categories')
      .set('Accept', 'application/json')
      .expect(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
