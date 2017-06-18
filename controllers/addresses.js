const express = require('express');
const router = express.Router();
const params = require('params');
const isLoggedIn = require('../middleware/isLoggedIn');

const Address = require('../models/address.js');

// GET all addresses
router.get('/', (req, res) => {
  Address
    .collection()
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
})

// CREATE a new address
router.post('/', isLoggedIn, (req, res) => {
  // do stuff to create new address
})

module.exports = router;