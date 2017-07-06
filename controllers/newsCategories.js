const express = require('express');
const router = express.Router();

const NewsCategory = require('../models/news_category.js');

// GET all project categories
router.get('/', function(req, res) {
  NewsCategory
    .collection()
    .fetch({
      withRelated: ['news_story'],
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