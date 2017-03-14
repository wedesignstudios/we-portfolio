const express = require('express');
const router = express.Router();

const Project = require('../models/project.js');

// GET all projects
router.get('/', (req, res, next) => {
  Project
    .collection()
    .fetch({
      withRelated: ['images', 'clients', 'clients.address', 'collaborators', 'collaborators.address'],     
      debug: true
    })
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// GET project by ID
router.get('/:id', (req, res, next) => {
  Project
    .forge({id: req.params.id})
    .fetch({
      withRelated: ['images', 'clients', 'clients.address', 'collaborators', 'collaborators.address'],
      debug: true
    })
    .then((project) => {      
      res.json(project);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;