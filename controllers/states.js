const express = require('express');
const router = express.Router();

const State = require('../models/state.js');

// GET all states
router.get('/', (req, res) => {
  State
    .collection()
    .fetch({
      debug: true
    })
    .then((states) => {
      res.json(states.toJSON());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
})

module.exports = router;