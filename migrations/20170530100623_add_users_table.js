exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('username');
      tbl.string('first_name');
      tbl.string('last_name');
      tbl.boolean('is_logged_in');
      tbl.timestamps();
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users');
};
