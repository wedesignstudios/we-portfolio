exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('projects_users', (tbl) => {
      tbl.increments('id').primary();
      tbl.integer('project_id').references('projects.id');
      tbl.integer('user_id').references('users.id');
      tbl.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('projects_users')
};