const express = require('express');
const router = express.Router();

const ProjectCategory = require('../models/project_category.js');

// GET all project categories
router.get('/', function(req, res) {
  ProjectCategory
    .collection()
    .fetch({
      withRelated: ['projects'],
      debug: true
    })
    .then((categories) => {
      res.json(categories.toJSON());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;