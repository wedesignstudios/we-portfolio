exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('news_categories').insert([
    {"name": "Press Release", "created_at": new Date, "updated_at": new Date}, {"name": "Event", "created_at": new Date, "updated_at": new Date}, {"name": "Award", "created_at": new Date, "updated_at": new Date}, {"name": "Media Mention", "created_at": new Date, "updated_at": new Date}
  ]);
};
