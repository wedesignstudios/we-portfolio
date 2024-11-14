exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("project_categories", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("name");
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists("projects_project_categories", (tbl) => {
      tbl.increments("id").primary();
      tbl.integer("project_id").references("projects.id");
      tbl.integer("project_category_id").references("project_categories.id");
      tbl.timestamps();
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("projects_project_categories")
    .dropTable("project_categories");
};
