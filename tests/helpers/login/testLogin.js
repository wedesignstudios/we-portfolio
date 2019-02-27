function testLogin(agent) {
  return async function(done) {
    agent
      .post('/login/test')
      .send({ username: 'testuser', password: 'anystring' })
      .expect('set-cookie', /connect.sid/)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  }
}

module.exports = { testLogin };
