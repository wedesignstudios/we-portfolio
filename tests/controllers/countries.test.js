const request = require('supertest'),
      app = require('../../index'),
      config = require('../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../helpers/knex/truncate'),
      idSeq = require('../helpers/knex/idSeqReset');

beforeAll(async () => {
  await trunc.truncate(knex, ['countries']);
  await idSeq.idSeqReset(knex, 'countries');
  return knex.seed.run(['test']);
});

describe('GET /countries', () => {
  it('responds with 200 status code', (done) => {
    request(app)
      .get('/api/v1/countries')
      .expect(200, done);
  });
  it('responds with a JSON object', (done) => {
    request(app)
      .get('/api/v1/countries')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, done);
  });
  it('responds with a JSON object containing data', (done) => {
    request(app)
      .get('/api/v1/countries')
      .set('Accept', 'application/json')
      .expect(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        return done();
      });
  });
});
