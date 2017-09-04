const bookshelf = require('../db/bookshelf');

const Project = require('./project');
const Image = require('./image');

const ProjectFeatureImage = bookshelf.Model.extend({
  tableName: 'project_feature_images',
  hasTimestamps: true,
  project: function() {
    return this.belongsTo('Project', 'project_id');
  },
  image: function() {
    return this.belongsTo('Image', 'image_id');
  }
});

module.exports = bookshelf.model('ProjectFeatureImage', ProjectFeatureImage);