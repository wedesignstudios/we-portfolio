const express = require('express');
const router = express.Router();
const params = require('params');

const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User
    .collection()
    .fetch({
      debug: true
    })
    .then((user) => {      
      res.json(user);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

router.get('/:username', function(req, res, next) {  
  User
    .forge({username: req.params.username})
    .fetch({
      withRelated: [
        'projects',
        'projects.feature_image',
        'projects.images',
        'projects.clients',
        'projects.collaborators',
        'projects.project_categories',
        'projects.project_images_sort_order'
      ],
      debug: true
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });  
});

module.exports = router;