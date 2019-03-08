const fs = require('fs'),
      path = require('path'),
      request = require('supertest'),
      app = require('../../../index'),
      agent = request.agent(app),
      config = require('../../../knexfile'),
      knex = require('knex')(config['test']),
      tblNm = require('../knex/tableName'),
      login = require('../login/testLogin');

function httpPOST(routeName, data) {
  return(
    describe(`POST /${routeName}`, () => {
      let table = tblNm.tableName(routeName),
          tableCount1;

      beforeAll(async () => {
        await knex(table)
                .count('id')
                .then(cnt => {
                  tableCount1 = parseInt(cnt[0]['count']);
              });
      });

      it('login', login.testLogin(agent));

      it(`persists a new record in the ${table} db table`, (done) => {
        agent
          .post(`/api/v1/${routeName}`)
          .send(data)
          .expect(200)
          .then(() => {
            return(
              knex(table)
                .count('id')
                .then(cnt => {
                  let tableCount2 = parseInt(cnt[0]['count']);

                  expect(tableCount2).toBe(tableCount1 + 1);
                  done();
                })
            )
          });
      });
    })
  );
}

function httpPOSTImg(routeName, imgFilePath) {
  return(
    describe(`POST /${routeName}/upload`, () => {
      let imgPath = imgFilePath,
          table = tblNm.tableName(routeName),
          buffer = new Buffer(fs.readFileSync(imgPath)),
          tableCount1;

      beforeAll(async () => {
        await knex(table)
                .count('id')
                .then(cnt => {
                  tableCount1 = parseInt(cnt[0]['count']);
              });
      });

      it('login', login.testLogin(agent));

      it(`persists a new record in the ${table} db table`, (done) => {
        agent
          .post(`/api/v1/${routeName}/upload`)
          .attach('image', buffer, path.basename(imgPath))
          .expect(200)
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

module.exports = { httpPOST, httpPOSTImg };
