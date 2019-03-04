exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('projects').insert([
    {
      "name": "Test Project",
      "date": new Date,
      "description": "Nulla ligula purus, blandit venenatis pharetra ut, pulvinar et nisi.",
      "created_at": new Date,
      "updated_at": new Date,
      "slug": "test-project",
      "visible": true
   }
  ]);
};
