const request = require('supertest'),
      app = require('../../index'),
      config = require('../../knexfile'),
      knex = require('knex')(config['test']);

beforeAll(async () => {
   await knex.raw('TRUNCATE TABLE addresses CASCADE');
   await knex.raw('ALTER SEQUENCE addresses_id_seq RESTART WITH 1');
   return knex('addresses').insert({"city": "Austin", "state": "TX", "country": "US"});
});

describe('GET /addresses', () => {
  it('responds with 200 status code', (done) => {
    request(app)
      .get('/api/v1/addresses')
      .expect(200, done);
  });
  it('responds with a JSON object', (done) => {
    request(app)
      .get('/api/v1/addresses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, done);
  });
  it('responds with a JSON object containing data', (done) => {
    request(app)
      .get('/api/v1/addresses')
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
