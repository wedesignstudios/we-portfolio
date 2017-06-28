const bookshelf = require('../db/bookshelf');

const NewsStory = require('./news_story');
const NewsStoriesNewsCategories = require('./news_stories_news_categories');

const NewsCategory = bookshelf.Model.extend({
  tableName: 'news_categories',
  hasTimestamps: true,
  duplicates: ['name'],
  news_story: function() {
    return this.belongsToMany('NewsStory').through('NewsStoriesNewsCategories');
  }
}, {
  dependents: ['news_story']
});

module.exports = bookshelf.model('NewsCategory', NewsCategory);