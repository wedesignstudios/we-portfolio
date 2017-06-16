const express = require('express');
const router = express.Router();
const params = require('params');
const isLoggedIn = require('../middleware/isLoggedIn');

const Project = require('../models/project');

// INDEX all projects
router.get('/', (req, res, next) => {
  Project
    .collection()
    .fetch({
      withRelated: ['images', 'clients', 'clients.address', 'collaborators', 'collaborators.address', 'project_categories'],
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

// SHOW a project by ID
router.get('/:id', (req, res, next) => {
  Project
    .forge({id: req.params.id})
    .fetch({
      withRelated: ['images', 'clients', 'clients.address', 'collaborators', 'collaborators.address', 'project_categories'],
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

// CREATE a new project
router.post('/', isLoggedIn, (req, res, next) => {
  const clients_ids = req.body.clients_ids;
  const collaborators_ids = req.body.collaborators_ids;

  const allowedKeys = ['name', 'date', 'description'];
  const formData = params(req.body).only(allowedKeys);

  if (Object.keys(formData).length != 0) {
    Project
      .forge(formData)
      .save()
      .then((project) => {
        if (clients_ids) project.clients().attach(clients_ids);
        if (collaborators_ids) project.collaborators().attach(collaborators_ids);
        res.redirect(`/projects/${project.id}`);
      })
      .catch((err) => {
        console.error(err);
        if (err.name == 'DuplicateError') {          
          res.status(500).send(`${err.name}: A Project with this ${err.field} already exists.`);          
        } else {
          res.sendStatus(500);
        }        
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// UPDATE a project
router.put('/:id', isLoggedIn, (req, res, next) => {
  const clients_ids = req.body.clients_ids;
  const clients_ids_detach = req.body.clients_ids_detach;
  const collaborators_ids = req.body.collaborators_ids;
  const collaborators_ids_detach = req.body.collaborators_ids_detach;
  const project_categories_ids = req.body.project_categories_ids;
  const project_categories_ids_detach = req.body.project_categories_ids_detach;
  const allowedKeys = ['name', 'date', 'description'];
  const formData = params(req.body).only(allowedKeys);

  if (Object.keys(formData).length != 0) {
    Project
      .forge({id: req.params.id})
      .save(formData, {method: 'update'})
      .then((project) => {
        if (clients_ids_detach) project.clients().detach(clients_ids_detach);
        if (clients_ids) project.clients().attach(clients_ids);

        if (collaborators_ids_detach) project.collaborators().detach(collaborators_ids_detach);
        if (collaborators_ids) project.collaborators().attach(collaborators_ids);

        if (project_categories_ids_detach) project.project_categories().detach(project_categories_ids_detach);
        if (project_categories_ids) project.project_categories().attach(project_categories_ids);
        project = project.toJSON();
        res.send(`Project ${project.name} has been updated.`);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// DELETE a project
router.delete('/:id', isLoggedIn, (req, res, next) => {
  Project
    .forge({id: req.params.id})
    .destroy()
    .then(() => {
      res.send(`Project ID: ${req.params.id} has been deleted.`);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;