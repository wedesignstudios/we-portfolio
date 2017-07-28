exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('images', (tbl) => {
      tbl.string('orig_name');
    })
  ])  
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('images', (tbl) => {
      tbl.dropColumn('orig_name');
    });
};
