function idSeqReset(knex, idSeqTable) {
  return knex.raw(`ALTER SEQUENCE ${idSeqTable}_id_seq RESTART WITH 1`);
}

module.exports = { idSeqReset };
