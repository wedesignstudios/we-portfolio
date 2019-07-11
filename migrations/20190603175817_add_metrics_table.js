exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.hasTable('metrics').then(function(exists) {
  		if (!exists) {
		  	return knex.schema.createTable('metrics', (tbl) => {
		  		tbl.increments('id').primary();
		  		tbl.string('key_metric');
		  		tbl.text('metric_value');
		  		tbl.integer('project_id').references('projects.id');
		  		tbl.timestamps();
		  	})
  		}
  	})
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema
  	.dropTable('metrics')
};
