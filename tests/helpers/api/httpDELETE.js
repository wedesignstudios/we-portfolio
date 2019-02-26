const request = require('supertest'),
      app = require('../../../index'),
      agent = request.agent(app),
      config = require('../../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../knex/truncate'),
      idSeq = require('../knex/idSeqReset'),
      tblNm = require('../knex/tableName'),
      login = require('../login/testLogin');

function httpDELETE(routeName, id) {
  return(
    describe(`DELETE /${routeName}/${id}/delete`, () => {
      let table = tblNm.tableName(routeName),
          record;

      beforeAll(async () => {
        await trunc.truncateCascade(knex, ['users']);
        await idSeq.idSeqReset(knex, 'users');
        return knex.seed.run(['test']);
      });

      it('login', login.testLogin(agent));

      it(`deletes a record in the ${table} table`, (done) => {
        agent
          .delete(`/api/v1/${routeName}/${id}/delete`)
          .expect(200)
          .then(() => {
            return(
              knex(table)
                .where('id', id)
                .select()
                .then(res => {
                  expect(res.length).toBe(0);
                  done();
                })
            )
          })
      })

    })
  )
}

module.exports = { httpDELETE };
