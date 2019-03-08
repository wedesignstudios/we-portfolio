exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('news_stories').insert([
    {"title": "My News Story", "date": new Date, "description": "My news story description.", "created_at": new Date, "updated_at": new Date}
  ]);
};
