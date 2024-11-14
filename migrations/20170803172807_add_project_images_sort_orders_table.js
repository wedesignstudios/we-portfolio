exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("project_images_sort_orders", (tbl) => {
      tbl.increments("id").primary();
      tbl.integer("project_id").references("projects.id");
      tbl.specificType("images_order", "integer[]");
      tbl.timestamps();
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists("project_images_sort_orders"),
  ]);
};
