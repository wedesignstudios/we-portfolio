exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("project_feature_images", (tbl) => {
      tbl.increments("id").primary();
      tbl.integer("project_id").references("projects.id");
      tbl.integer("image_id").references("images.id");
      tbl.timestamps();
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable("project_feature_images");
};
