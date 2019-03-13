exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('wp_meta_descriptions').insert([
    {
      "wp_post_id": 1,
      "meta_description": "Aenean nunc enim pulvinar tincidunt.",
      "created_at": new Date,
      "updated_at": new Date
    }
  ]);
};
