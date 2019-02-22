const request = require('supertest'),      
      app = require('../../../index'),
      agent = request.agent(app),
      config = require('../../../knexfile'),
      knex = require('knex')(config['test']),
      trunc = require('../knex/truncate'),
      idSeq = require('../knex/idSeqReset'),
      login = require('../login/testLogin');

function httpPOST(routeName, data) {
  return(
    describe(`POST /${routeName}`, () => {
      beforeAll(async () => {
        await trunc.truncateCascade(knex, ['users']);
        await idSeq.idSeqReset(knex, 'users');        
        return knex.seed.run(['test']);
      });

      it('login', login.testLogin(agent));

      it('creates a new instance of data model', (done) => {
        agent
          .post(`/api/v1/${routeName}`)
          .send(data)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    })
  );
}

module.exports = { httpPOST };
