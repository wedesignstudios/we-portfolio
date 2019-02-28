const idSeq = require('../../tests/helpers/knex/idSeqReset'),
      trunc = require('../../tests/helpers/knex/truncate');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return trunc.truncateCascade(knex, ['news_categories'])
    .then(() => {
      return idSeq.idSeqReset(knex, 'news_categories');
    })
    .then(function () {
      // Inserts seed entries
      return knex('news_categories').insert([
        {"name": "Press Release", "created_at": new Date, "updated_at": new Date}, {"name": "Event", "created_at": new Date, "updated_at": new Date}, {"name": "Award", "created_at": new Date, "updated_at": new Date}, {"name": "Media Mention", "created_at": new Date, "updated_at": new Date}
      ]);
    });
};
