exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.table('projects', (tbl) => {
  		tbl.text('result_statement');
  	})
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema
  	.table('projects', (tbl) => {
  		tbl.dropColumn('result_statement');
  	})
};
