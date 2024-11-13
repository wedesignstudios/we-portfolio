exports.up = function (knex) {
  return Promise.all([
    knex.schema.table("images", (tbl) => {
      tbl.string("orig_name");
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.table("images", (tbl) => {
    tbl.dropColumn("orig_name");
  });
};
