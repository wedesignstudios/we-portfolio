exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {"username": "testuser", "first_name": "Test", "last_name": "User"}
      ]);
    });
};
