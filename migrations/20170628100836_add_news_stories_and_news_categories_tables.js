exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("news_stories", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("title");
      tbl.date("date");
      tbl.text("description");
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists("news_categories", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("name");
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists(
      "news_stories_news_categories",
      (tbl) => {
        tbl.increments("id").primary();
        tbl.integer("news_story_id").references("news_stories.id");
        tbl.integer("news_category_id").references("news_categories.id");
        tbl.timestamps();
      }
    ),
  ]);
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("news_stories_news_categories")
    .dropTable("news_categories")
    .dropTable("news_stories");
};
