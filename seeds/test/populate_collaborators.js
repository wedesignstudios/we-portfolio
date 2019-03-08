exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('collaborators').insert([
    {"name": "My Collaborator LLC", "url": "https://mycollaboratorllc.com", "created_at": new Date, "updated_at": new Date}
  ]);
};
