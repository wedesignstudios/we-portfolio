const express = require('express');
const router = express.Router();
const params = require('params');
const isLoggedIn = require('../middleware/isLoggedIn');

const Client = require('../models/client.js');
const Address = require('../models/address.js');

// INDEX all clients
router.get('/', (req, res, next) => {
  Client
    .collection()
    .orderBy('name', 'ASC')
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((clients) => {
      res.json(clients.toJSON());
    })
    .catch((err) => {
      console.error(err);
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
      if(client) {
        res.json(client.toJSON());
      } else {
        res.json(null);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// CREATE a new client
router.post('/', isLoggedIn, (req, res, next) => {
  const allowedKeys = ['name', 'url'];
  const allowedAddressKeys = ['city', 'state', 'country'];
  const formData = params(req.body).only(allowedKeys);
  const formAddressData = params(req.body).only(allowedAddressKeys);

  if (Object.keys(formData).length != 0) {
    Client
      .forge(formData)
      .save()
      .then((client) => {
        return Address
          .forge(formAddressData)
          .save()
          .then((address) => {
            client.address().attach(address.id);
            client = client.toJSON();
            return res.status(200).send(`${client.name} successfully created.`);
          })
      })
      .catch((err) => {
        console.error(err);        
        if (err.name == 'DuplicateError') {
          res.status(500).send(`${err.name}: A client with the ${err.field} ${req.body.name} already exists.`);
        } else {
          res.status(500).send(`Whoops! The following error occurred: ${err}`);
        }
    })
  } else {
    res.status(400).send('Bad Request');
  };
});

// UPDATE a client
router.put('/:id', isLoggedIn, (req, res, next) => {
  const address_id = req.body.address_id;
  const allowedKeys = ['name', 'url'];
  const allowedAddressKeys = ['city', 'state', 'country'];
  const formData = params(req.body).only(allowedKeys);
  const formAddressData = params(req.body).only(allowedAddressKeys);

  if (Object.keys(formData).length != 0) {
    Client
      .forge({id: req.params.id})
      .save(formData, {method: 'update'})
      .then((client) => {
        Address
          .forge({id: address_id})
          .save(formAddressData, {method: 'update'});
        client = client.toJSON();
        return res.status(200).send(`${client.name} has been updated.`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Whoops! The following error occurred: ${err}`);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// DELETE a client
router.delete('/:id/delete', isLoggedIn, (req, res, next) => {
  const client_name = req.body.name;
  const address_id = req.body.address_id;

  Client
    .forge({id: req.params.id})
    .destroy()
    .then(() => {
      return Address
        .forge({id: address_id})
        .destroy();
    })
    .then(() => {
      return res.status(200).send(`${client_name} has been deleted.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Whoops! The following error occurred: ${err}`);
    });
});

module.exports = router;