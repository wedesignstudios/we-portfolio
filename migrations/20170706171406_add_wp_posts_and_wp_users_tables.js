exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists("wp_posts", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("post_author");
      tbl.date("post_date");
      tbl.text("post_content");
      tbl.string("post_title");
      tbl.text("post_excerpt");
      tbl.string("post_name");
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists("wp_users", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("user_login");
      tbl.string("user_email");
      tbl.string("display_name");
      tbl.timestamps();
    }),
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable("wp_posts").dropTable("wp_users");
};
