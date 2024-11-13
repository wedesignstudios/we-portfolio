exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("addresses_clients", (tbl) => {
      tbl.increments("id").primary();
      tbl.integer("address_id").references("addresses.id");
      tbl.integer("client_id").references("clients.id");
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists("addresses_collaborators", (tbl) => {
      tbl.increments("id").primary();
      tbl.integer("address_id").references("addresses.id");
      tbl.integer("collaborator_id").references("collaborators.id");
      tbl.timestamps();
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("addresses_clients"),
    knex.schema.dropTableIfExists("addresses_collaborators"),
  ]);
};
