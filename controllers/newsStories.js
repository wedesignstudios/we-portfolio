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

// SHOW a news story by ID
router.get('/:id', (req, res, next) => {
  NewsStory
    .forge({id: req.params.id})
    .fetch({
      withRelated: ['image', 'news_categories'],
      debug: true
    })
    .then((story) => {
      if(story) {
        res.json(story);
      } else {
        res.json(null);
      }
    })
    .catch((err) => {
      console.error('Error message: ', err);
      res.sendStatus(500);
    });
});

// CREATE new news story
router.post('/', isLoggedIn, (req, res, next) => {
  const allowedKeys = ['title', 'date', 'description'];
  const formData = params(req.body).only(allowedKeys);

  if(Object.keys(formData).length != 0) {
    NewsStory
      .forge(formData)
      .save()
      .then((story) => {
        story = story.toJSON();
        return res.status(200).send(`${story.title} successfully created.`);
      })
      .catch((err) => {
        console.error('Error message: ', err);
        res.send(500).send(`Whoops! The following error occurred: ${err}`);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// UPDATE news story

// DELETE news story

module.exports = router;