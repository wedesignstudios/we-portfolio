const express = require('express');
const router = express.Router();

const Post = require('../models/wp_post.js');

// GET all posts
router.get('/', (req, res) => {
  Post
    .collection()
    .orderBy('post_date')
    .fetch({
      debug: true
    })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// SHOW a post by post_name
router.get('/:post_name', (req, res) => {
  Post
    .forge({post_name: req.params.post_name})
    .fetch({
      withRelated: ['author', 'meta_description'],
      debug: true
    })
    .then(post => {
      if(post) {
        res.json(post);
      } else {
        res.json(null);
      }
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;