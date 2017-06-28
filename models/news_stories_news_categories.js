const bookshelf = require('../db/bookshelf');

const NewsStory = require('./news_story');
const NewsCategory = ('./news_category');

const NewsStoriesNewsCategories = bookshelf.Model.extend({
  tableName: 'news_stories_news_categories',
  hasTimestamps: true,
  news_story: function() {
    return this.belongsTo('NewsStory');
  },
  news_category: function() {
    return this.belongsTo('NewsCategory');
  }
});

module.exports = bookshelf.model('NewsStoriesNewsCategories', NewsStoriesNewsCategories);