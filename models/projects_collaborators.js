const bookshelf = require('../db/bookshelf');

const Project = require('./project.js');
const Collaborator = ('./collaborator');

const ProjectsCollaborators = bookshelf.Model.extend({
  tableName: 'projects_collaborators',
  hasTimestamps: true,
  project: function() {
    return this.belongsTo(Project);
  },
  collaborator: function() {
    return this.belongsTo(Collaborator);
  }
});

module.exports = bookshelf.model('ProjectsCollaborators', ProjectsCollaborators);