const express = require('express');
const router = express.Router();

const Country = require('../models/country.js');

// GET all countries
router.get('/', (req, res) => {
  Country
    .collection()
    .fetch({
      debug: true
    })
    .then((countries) => {
      res.json(countries.toJSON());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
})

module.exports = router;