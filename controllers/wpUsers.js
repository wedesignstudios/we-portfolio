const express = require('express');
const router = express.Router();

const wpUser = require('../models/wp_user.js');

// GET all WordPress users
router.get('/', (req, res) => {
  wpUser
    .collection()
    .orderBy('id')
    .fetch({
      debug: true
    })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;