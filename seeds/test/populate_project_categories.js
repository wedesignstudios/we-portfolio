exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('project_categories').insert([
    {"name": "Design", "created_at": new Date, "updated_at": new Date}, {"name": "Development", "created_at": new Date, "updated_at": new Date}, {"name": "Art Direction", "created_at": new Date, "updated_at": new Date}, {"name": "Illustration", "created_at": new Date, "updated_at": new Date}
  ]);
};
