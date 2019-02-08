function truncate(knex, arrOfTables) {
  let tables = arrOfTables.join(', ');

  return knex.raw(`TRUNCATE TABLE ${tables}`);
}

function truncateCascade(knex, arrOfTables) {
  let tables = arrOfTables.join(', ');

  return knex.raw(`TRUNCATE TABLE ${tables} CASCADE`);
}

module.exports =  { truncate, truncateCascade };
