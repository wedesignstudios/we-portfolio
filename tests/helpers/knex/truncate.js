function truncate(knex, arrOfTables) {
  let tables = arrOfTables.join(', ');

  return knex.raw(`TRUNCATE TABLE ${tables} RESTART IDENTITY`);
}

function truncateCascade(knex, arrOfTables) {
  let tables = arrOfTables.join(', ');

  return knex.raw(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE`);
}

module.exports =  { truncate, truncateCascade };
