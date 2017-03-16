const express = require('express');
const router = express.Router();

const Image = require('../models/image.js');

// GET all images
router.get('/', (req, res, next) => {
  Image
    .collection()
    .fetch({
      withRelated: ['project'],
      debug: true
    })
    .then((image) => {      
      res.json(image);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// GET image by ID
router.get('/:id', (req, res, next) => {
  Image
    .forge({id: req.params.id})
    .fetch({
      withRelated: ['project'],
      debug: true
    })
    .then((image) => {      
      res.json(image);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;