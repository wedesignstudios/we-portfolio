exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('clients').insert([
    {"name": "My Client LLC", "url": "https://myclientllc.com", "created_at": new Date, "updated_at": new Date}
  ]);
};
