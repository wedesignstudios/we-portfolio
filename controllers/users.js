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
    .fetch({debug: true})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });  
});

module.exports = router;