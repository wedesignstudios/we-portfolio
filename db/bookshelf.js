const config  = require('../knexfile.js');
const knex = require('knex')(config[process.env.NODE_ENV]);
const bookshelf = require('bookshelf')(knex);
const cascadeDelete = require('bookshelf-cascade-delete');

bookshelf.plugin(cascadeDelete);
bookshelf.plugin(require('bookshelf-check-duplicates'));

module.exports = bookshelf;
