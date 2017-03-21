const express = require('express');
const router = express.Router();
const params = require('params');

const Client = require('../models/client.js');

// INDEX all clients
router.get('/', (req, res, next) => {
  Client
    .collection()
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((clients) => {
      res.json(clients.toJSON());
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// SHOW a client by ID
router.get('/:id', (req, res, next) => {
  Client
    .forge({id: req.params.id})
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((client) => {      
      res.json(client.toJSON());
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// CREATE a new client
router.post('/', (req, res, next) => {
  const projects_ids = req.body.projects_ids;

  const allowedKeys = ['name', 'url'];
  const formData = params(req.body).only(allowedKeys);

  if (Object.keys(formData).length != 0) {
    Client
      .forge(formData)
      .save()
      .then((client) => {
        if (projects_ids) client.projects().attach(projects_ids);
        res.redirect(`/clients/${client.id}`);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
  } else {
    res.status(400).send('Bad Request');
  };
});

// UPDATE a client
router.put('/:id', (req, res, next) => {
  const allowedKeys = ['name', 'url'];
  const formData = params(req.body).only(allowedKeys);

  if (Object.keys(formData).length != 0) {
    Client
      .forge({id: req.params.id})
      .save(formData)
      .then((client) => {
        client = client.toJSON();
        res.send(`Client ${client.name} has been updated.`);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// DELETE a client
router.delete('/:id', (req, res, next) => {
  Client
    .forge({id: req.params.id})
    .destroy()
    .then(() => {
      res.send(`Client ID: ${req.params.id} has been deleted.`);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;