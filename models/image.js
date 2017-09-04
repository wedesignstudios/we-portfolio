const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const NewsStory = require('./news_story');
const ProjectFeatureImage = require('./project_feature_images');

const Image = bookshelf.Model.extend({
  tableName: 'images',
  hasTimestamps: true,
  duplicates: ['url'],
  project: function() {
    return this.belongsTo('Project', 'project_id');
  },
  news_story: function() {
    return this.belongsTo('NewsStory', 'news_story_id');
  },
  feature_image_project: function() {
    return this.hasOne('ProjectFeatureImage');
  }
});

module.exports = bookshelf.model('Image', Image);