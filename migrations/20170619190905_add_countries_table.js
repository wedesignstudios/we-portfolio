exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("countries", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("name");
      tbl.string("code");
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable("countries");
};
