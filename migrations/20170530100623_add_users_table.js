exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("users", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("username");
      tbl.string("first_name");
      tbl.string("last_name");
      tbl.timestamps();
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
