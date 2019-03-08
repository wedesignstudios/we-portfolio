exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('addresses').insert([
    {"city": "Austin", "state": "TX", "country": "US", "created_at": new Date, "updated_at": new Date}
  ]);
};
