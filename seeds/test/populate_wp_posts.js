exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('wp_posts').insert([
    {
      "post_author": "WP Author",
      "post_date": new Date,
      "post_content": "Nulla ligula purus, blandit venenatis pharetra ut, pulvinar et nisi. Mauris tortor metus, rhoncus iaculis ultricies sit amet, imperdiet at ante.",
      "post_title": "WP Post Title",
      "post_excerpt": "WP Excerpt",
      "post_name": "WP Post Name",
      "created_at": new Date,
      "updated_at": new Date
   }
  ]);
};
