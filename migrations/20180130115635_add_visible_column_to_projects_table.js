exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('projects', (tbl) => {
      tbl.boolean('visible');
    })
  ])  
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('projects', (tbl) => {
      tbl.dropColumn('visible');
    })
};