const request = require('supertest'),
      app = require('../../../index');

function httpGET(routeName) {
  return(
    describe(`GET /${routeName}`, () => {
      it('responds with a JSON object containing data', (done) => {
        request(app)
          .get(`/api/v1/${routeName}`)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
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
    })
  );
}

function httpGETRelated(routeName, relatedModelsArr) {
  return(
    describe(`GET /${routeName}`, () => {
      it('responds with JSON object containing primary model data and related model data', (done) => {
        request(app)
          .get(`/api/v1/${routeName}`)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body.length).toBeGreaterThan(0);
            relatedModelsArr.map(model => {
              return expect(res.body[0]).toHaveProperty(model);
            })
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            return done();
          });
      })
    })
  )
}

function httpGETById(routeName, id) {
  return(
    describe(`GET /${routeName}/${id}`, () => {
      it('responds with JSON object containing data by id', (done) => {
        request(app)
          .get(`/api/v1/${routeName}/${id}`)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.id).toBe(id);
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            return done();
          });
      })
    })
  )
}

function httpGETByIdRelated(routeName, id, relatedModelsArr) {
  return(
    describe(`GET /${routeName}/${id}`, () => {
      it('responds with JSON object containing data by id', (done) => {
        request(app)
          .get(`/api/v1/${routeName}/${id}`)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.id).toBe(id);
            relatedModelsArr.map(model => {
              return expect(res.body).toHaveProperty(model);
            })
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            return done();
          });
      })
    })
  )
}

module.exports = { httpGET, httpGETRelated, httpGETById, httpGETByIdRelated };
