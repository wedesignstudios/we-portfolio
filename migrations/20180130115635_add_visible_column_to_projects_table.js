exports.up = function (knex) {
  return Promise.all([
    knex.schema.table("projects", (tbl) => {
      tbl.boolean("visible");
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.table("projects", (tbl) => {
    tbl.dropColumn("visible");
  });
};
