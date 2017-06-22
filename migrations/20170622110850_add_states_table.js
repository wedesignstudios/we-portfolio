exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('states', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name');
      tbl.string('code');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('states');
};