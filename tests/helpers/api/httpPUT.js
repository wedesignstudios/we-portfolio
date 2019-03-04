const request = require('supertest'),
      app = require('../../../index'),
      agent = request.agent(app),
      config = require('../../../knexfile'),
      knex = require('knex')(config['test']),
      tblNm = require('../knex/tableName'),
      login = require('../login/testLogin');

function httpPUT(routeName, id, data) {
  return(
    describe(`PUT /${routeName}/${id}`, () => {
      let table = tblNm.tableName(routeName),
          record;

      beforeAll(async () => {
        await knex(table)
                .where('id', id)
                .select()
                .then(res => {
                  record = res[0];
                })
      });

      it('login', login.testLogin(agent));

      it(`updates a record in the ${table} table`, (done) => {
        agent
          .put(`/api/v1/${routeName}/${id}`)
          .send(data)
          .expect(200)
          .then(() => {
            return(
              knex(table)
                .where('id', id)
                .select()
                .then(res => {
                  Object.keys(data).map(key => {
                    if(record[key]) {
                      expect(res[0][key]).not.toBe(record[key]);
                    }
                  })
                  done();
                })
            )
          })
      })
    })
  )
}

module.exports = { httpPUT };
