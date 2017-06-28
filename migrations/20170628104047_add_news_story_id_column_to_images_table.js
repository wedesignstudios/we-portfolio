exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('images', (tbl) => {
      tbl.integer('news_story_id').references('news_stories.id');
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('images', (tbl) => {
      tbl.dropColumn('news_story_id');
    });
};
