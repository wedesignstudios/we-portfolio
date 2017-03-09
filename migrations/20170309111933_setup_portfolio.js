exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('projects', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name');
      tbl.date('date');
      tbl.text('description');      
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('clients', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name');
      tbl.string('url');
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('collaborators', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name');
      tbl.string('url');
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('addresses', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('city');
      tbl.string('state');
      tbl.string('country');
      tbl.integer('client_id').references('clients.id');
      tbl.integer('collaborator_id').references('collaborators.id');
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('images', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('title');
      tbl.string('alt');
      tbl.string('url');
      tbl.integer('project_id').references('projects.id');
      tbl.boolean('index_page');
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('clients_projects', (tbl) => {
      tbl.increments('id').primary();
      tbl.integer('project_id').references('projects.id');
      tbl.integer('client_id').references('clients.id');
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('collaborators_projects', (tbl) => {
      tbl.increments('id').primary();
      tbl.integer('project_id').references('projects.id');
      tbl.integer('collaborator_id').references('collaborators.id');
      tbl.timestamps();
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('projects')
    .dropTable('clients')
    .dropTable('collaborators')
    .dropTable('addresses')
    .dropTable('images')
    .dropTable('clients_projects')
    .dropTable('collaborators_projects');
};
