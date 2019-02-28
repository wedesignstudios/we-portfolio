const idSeq = require('../../tests/helpers/knex/idSeqReset');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return idSeq.idSeqReset(knex, 'users');
    })
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {"username": "testuser", "first_name": "Test", "last_name": "User", "created_at": new Date, "updated_at": new Date}
      ]);
    });
};
