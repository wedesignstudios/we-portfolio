exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('addresses').del()
    .then(function () {
      // Inserts seed entries
      return knex('addresses').insert([
        {"city": "Austin", "state": "TX", "country": "US"}
      ]);
    });
};
