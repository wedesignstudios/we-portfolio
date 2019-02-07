const request = require('supertest'),
      app = require('../../index'),
      knex = require('knex'),
      config = require('../../knexfile'),
      db = knex(config['test']);

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  return db('addresses').insert({"city": "Austin", "state": "TX", "country": "US"});
});

describe('GET /addresses', function () {
  it('responds with 200 status code', function (done) {
    request(app)
      .get('/api/v1/addresses')
      .expect(200, done);
  });
  it('responds with a JSON object', function (done) {
    request(app)
      .get('/api/v1/addresses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, done);
  });
  it('responds with a JSON object containing data', function (done) {
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
