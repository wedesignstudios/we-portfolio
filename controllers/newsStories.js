const express = require('express');
const router = express.Router();
const params = require('params');
const isLoggedIn = require('../middleware/isLoggedIn');

const NewsStory = require('../models/news_story');

// GET all news stories
router.get('/', (req, res, next) => {
  NewsStory
    .collection()
    .orderBy('title', 'ASC')
    .fetch({
      withRelated: ['image', 'news_categories'],
      debug: true
    })
    .then((stories) => {
      res.json(stories)
    })
    .catch((err) => {
      console.error('Error message: ', err);
      res.sendStatus(500);
    });
});

// CREATE new news story

// UPDATE news story

// DELETE news story

module.exports = router;