const request = require('supertest'),      
      app = require('../../../index'),
      agent = request.agent(app),
      config = require('../../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../knex/truncate'),
      idSeq = require('../knex/idSeqReset'),
      tblNm = require('../knex/tableName'),
      login = require('../login/testLogin');

function httpPOST(routeName, data) {
  return(
    describe(`POST /${routeName}`, () => {
      let table = tblNm.tableName(routeName),
          tableCount1;

      beforeAll(async () => {
        await trunc.truncateCascade(knex, ['users']);
        await idSeq.idSeqReset(knex, 'users');
        await knex(table)
                .count('id')
                .then(cnt => {
                  tableCount1 = parseInt(cnt[0]['count']);
              });
        return knex.seed.run(['test']);
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

module.exports = { httpPOST };
