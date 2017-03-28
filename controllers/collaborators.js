const express = require('express');
const router = express.Router();
const params = require('params');

const Collaborator = require('../models/collaborator.js');

// INDEX all collaborators
router.get('/', (req, res, next) => {
  Collaborator
    .collection()
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((collabor) => {
      res.json(collabor.toJSON());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// SHOW a collaborator by ID
router.get('/:id', (req, res, next) => {
  Collaborator
    .forge({id: req.params.id})
    .fetch({
      withRelated: ['projects', 'address'],
      debug: true
    })
    .then((collaborator) => {      
      res.json(collaborator.toJSON());
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// CREATE a new collaborator
router.post('/', (req, res, next) => {
  const projects_ids = req.body.projects_ids;

  const allowedKeys = ['name', 'url'];
  const formData = params(req.body).only(allowedKeys);

  if (Object.keys(formData).length != 0) {
    Collaborator
      .forge(formData)
      .save()
      .then((collaborator) => {
        if (projects_ids) collaborator.projects().attach(projects_ids);
        res.redirect(`/collaborators/${collaborator.id}`);
      })
      .catch((err) => {
        console.error(err);
        if (err.name == 'DuplicateError') {
          res.status(500).send(`${err.name}: A Collaborator with this ${err.field} already exists.`);          
        } else {
          res.sendStatus(500);
        }
    })
  } else {
    res.status(400).send('Bad Request');
  };
});

// UPDATE a collaborator
router.put('/:id', (req, res, next) => {
  const projects_ids = req.body.projects_ids;
  const projects_ids_detach = req.body.projects_ids_detach;

  const allowedKeys = ['name', 'url'];
  const formData = params(req.body).only(allowedKeys);

  if (Object.keys(formData).length != 0) {
    Collaborator
      .forge({id: req.params.id})
      .save(formData, {method: 'update'})
      .then((collaborator) => {
        if (projects_ids_detach) collaborator.projects().detach(projects_ids_detach);
        if (projects_ids) collaborator.projects().attach(projects_ids);      
        collaborator = collaborator.toJSON();
        res.send(`Collaborator ${collaborator.name} has been updated.`);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// DELETE a collaborator
router.delete('/:id', (req, res, next) => {
  Collaborator
    .forge({id: req.params.id})
    .destroy()
    .then(() => {
      res.send(`Collaborator ID: ${req.params.id} has been deleted.`);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;