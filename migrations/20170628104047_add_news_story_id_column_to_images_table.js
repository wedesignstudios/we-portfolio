exports.up = function (knex) {
  return Promise.all([
    knex.schema.table("images", (tbl) => {
      tbl.integer("news_story_id").unique().references("news_stories.id");
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.table("images", (tbl) => {
    tbl.dropColumn("news_story_id");
  });
};
