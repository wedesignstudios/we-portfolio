const express = require('express');
const router = express.Router();

const Address = require('../models/address.js');

// GET all addresses
router.get('/', (req, res) => {
  Address
    .collection()
    .query('distinct', 'city')
    .orderBy('city', 'ASC')
    .fetch({
      debug: true
    })
    .then((addresses) => {
      res.json(addresses.toJSON());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;