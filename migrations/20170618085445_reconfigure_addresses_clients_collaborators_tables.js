exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('addresses_clients', (tbl) => {
      tbl.increments('id').primary();
      tbl.integer('address_id');
      tbl.integer('client_id');
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('addresses_collaborators', (tbl) => {
      tbl.increments('id').primary();
      tbl.integer('address_id');
      tbl.integer('collaborator_id');
      tbl.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('clients', (tbl) => {
      tbl.dropColumn('address_id');
    }),
    knex.schema.table('collaborators', (tbl) => {
      tbl.dropColumn('address_id');
    }),
    knex.schema.dropTableIfExists('addresses_clients'),
    knex.schema.dropTableIfExists('addresses_collaborators')
  ]);
};