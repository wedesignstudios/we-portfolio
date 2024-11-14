exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("wp_meta_descriptions", (tbl) => {
      tbl.increments("id").primary();
      tbl.integer("wp_post_id");
      tbl.text("meta_description");
      tbl.timestamps();
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable("wp_meta_descriptions");
};
