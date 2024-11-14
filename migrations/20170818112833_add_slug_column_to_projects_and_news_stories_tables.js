exports.up = function (knex) {
  return Promise.all([
    knex.schema.table("projects", (tbl) => {
      tbl.string("slug");
    }),
    knex.schema.table("news_stories", (tbl) => {
      tbl.string("slug");
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema
    .table("projects", (tbl) => {
      tbl.dropColumn("slug");
    })
    .table("news_stories", (tbl) => {
      tbl.dropColumn("slug");
    });
};
