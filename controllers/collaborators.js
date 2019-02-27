const express = require('express');
const router = express.Router();
const params = require('params');
const isLoggedIn = require('../middleware/isLoggedIn');

const Collaborator = require('../models/collaborator.js');
const Address = require('../models/address.js');

// INDEX all collaborators
router.get('/', (req, res, next) => {
  Collaborator
    .collection()
    .orderBy('name', 'ASC')
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((collaborator) => {
      res.json(collaborator);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// SHOW a collaborator by ID
router.get('/:id', (req, res, next) => {
  Collaborator
    .forge({id: parseInt(req.params.id)})
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((collaborator) => {
      if(collaborator) {
        res.json(collaborator);
      } else {
        res.json(null);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// CREATE a new collaborator
router.post('/', isLoggedIn, (req, res, next) => {
  const allowedKeys = ['name', 'url'];
  const allowedAddressKeys = ['city', 'state', 'country'];
  const formData = params(req.body).only(allowedKeys);
  const formAddressData = params(req.body).only(allowedAddressKeys);

  if (Object.keys(formData).length != 0) {
    Collaborator
      .forge(formData)
      .save()
      .then((collaborator) => {
        return Address
          .forge(formAddressData)
          .save()
          .then((address) => {
            collaborator.address().attach(address.id);
            collaborator = collaborator.toJSON();
            return res.status(200).send(`${collaborator.name} successfully created.`);
          })
      })
      .catch((err) => {
        console.error(err);
        if (err.name == 'DuplicateError') {
          res.status(500).send(`${err.name}: A collaborator with the ${err.field} ${req.body.name} already exists.`);
        } else {
          res.status(500).send(`Whoops! The following error occurred: ${err}`);
        }
    })
  } else {
    res.status(400).send('Bad Request');
  };
});

// UPDATE a collaborator
router.put('/:id', isLoggedIn, (req, res, next) => {
  const address_id = parseInt(req.body.address_id);
  const allowedKeys = ['name', 'url'];
  const allowedAddressKeys = ['city', 'state', 'country'];
  const formData = params(req.body).only(allowedKeys);
  const formAddressData = params(req.body).only(allowedAddressKeys);

  if (Object.keys(formData).length != 0) {
    Collaborator
      .forge({id: parseInt(req.params.id)})
      .save(formData, {method: 'update'})
      .then((collaborator) => {
        Address
          .forge({id: address_id})
          .save(formAddressData, {method: 'update'});
        collaborator = collaborator.toJSON();
        return res.status(200).send(`${collaborator.name} has been updated.`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Whoops! The following error occurred: ${err}`);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// DELETE a collaborator
router.delete('/:id/delete', isLoggedIn, (req, res, next) => {
  const collaborator_name = req.body.name;
  const address_id = parseInt(req.body.address_id);;

  Collaborator
    .forge({id: parseInt(req.params.id)})
    .destroy()
    .then(() => {
       return Address
        .forge({id: address_id})
        .destroy();
    })
    .then(() => {
      return res.status(200).send(`${collaborator_name} has been deleted.`);  
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Whoops! The following error occurred: ${err}`);
    });
});

module.exports = router;