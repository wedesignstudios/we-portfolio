const bookshelf = require('../db/bookshelf');

const NewsCategory = require('./news_category');
const NewsStoriesNewsCategories = require('./news_stories_news_categories');
const Image = require('./image');

const NewsStory = bookshelf.Model.extend({
  tableName: 'news_stories',
  hasTimestamps: true,  
  image: function() {
    return this.hasOne('Image');
  },
  news_category: function() {
    return this.belongsToMany('NewsCategory').through('NewsStoriesNewsCategories');
  }
});

module.exports = bookshelf.model('NewsStory', NewsStory);