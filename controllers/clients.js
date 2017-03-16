const express = require('express');
const router = express.Router();

const Client = require('../models/client.js');

// GET all clients
router.get('/', (req, res, next) => {
  Client
    .collection()
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((clients) => {
      res.json(clients);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// GET client by ID
router.get('/:id', (req, res, next) => {
  Client
    .forge({id: req.params.id})
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((client) => {      
      res.json(client);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;