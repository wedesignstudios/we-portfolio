const express = require('express');
const router = express.Router();
const params = require('params');
const isLoggedIn = require('../middleware/isLoggedIn');
const bookshelf = require('../db/bookshelf');

const Project = require('../models/project');
const Image = require('../models/image');
const Client = require('../models/client');
const Collaborator = require('../models/collaborator');
const ProjectCategory = require('../models/project_category');
const ProjectImagesSortOrder = require('../models/project_images_sort_order');
const ProjectFeatureImage = require('../models/project_feature_images');

// INDEX all projects
router.get('/', (req, res, next) => {
  Project
    .collection()
    .orderBy('name', 'ASC')
    .fetch({
      withRelated: [
        'images',
        'feature_image.image',
        'users',
        'clients',
        'clients.address',
        'collaborators',
        'collaborators.address',
        'project_categories',
        'project_images_sort_order'
      ],
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

// GET project preview JSON

router.get('/preview', isLoggedIn, (req, res) => {
  res.json(req.session.projectPreview);
});

// SHOW a project by ID/slug
router.get('/:param', (req, res, next) => {
  let key;
  let param = req.params.param;

  isNaN(parseInt(param)) ? (key = 'slug') : (key = 'id');

  Project
    .forge({[key]: req.params.param})
    .fetch({
      withRelated: [
        'images',
        'feature_image.image',
        'users',
        'clients',
        'clients.address',
        'collaborators',
        'collaborators.address',
        'project_categories',
        'project_images_sort_order'
      ],
      debug: true
    })
    .then((project) => {
      if(project) {
        res.json(project);
      } else {
        res.json(null);
      }
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// CREATE a new project
router.post('/', isLoggedIn, (req, res, next) => {
  const images_ids = req.body.images_ids;
  const clients_ids = req.body.clients_ids;
  const collaborators_ids = req.body.collaborators_ids;
  const project_categories_ids = req.body.project_categories_ids;
  const users_ids = req.body.users_ids;
  const feature_image_id = req.body.feature_image.id;
  const image_sort_order = req.body.image_sort_order;
  const allowedKeys = ['name', 'date', 'result_statement', 'description', 'visible'];
  const formData = params(req.body).only(allowedKeys);
  formData['slug'] = formData.name.toLowerCase().replace(/[^a-zA-Z0-9 ]/gi, '').replace(/ /gi, '-');

  if (Object.keys(formData).length != 0) {
    Project
      .forge(formData)
      .save()
      .then((project) => {
        project.clients().attach(clients_ids);
        project.collaborators().attach(collaborators_ids);
        project.project_categories().attach(project_categories_ids);
        project.users().attach(users_ids);
        // Add images
        project.related('images')
          .fetch()
          .then((images) => {
            if(images.length === 0 && images_ids.length > 0) {
              images_ids.forEach(imageId => {
                return Image
                  .forge({id: imageId})
                  .fetch()
                  .then(img => {
                    return img.save({project_id: project.id}, {method: 'update', patch: true})
                  });
              });
            };
          });
        // Add feature image
        project.related('feature_image')
          .fetch()
          .then((image) => {
            if(image === null && feature_image_id !== '') {
              return ProjectFeatureImage
                .forge({project_id: project.id, image_id: feature_image_id})
                .save();
            }
          });
        // Add image sort order
        project.related('project_images_sort_order')
          .fetch()
          .then(sort_order => {
            if(sort_order === null && image_sort_order.length > 0) {
              return ProjectImagesSortOrder
                .forge({project_id: project.id, images_order: image_sort_order})
                .save();
            }
          });
        // toJSON
        project = project.toJSON();
        return res.status(200).send(`${project.name} successfully created.`);
      })
      .catch((err) => {
        console.error(err);
        if (err.name == 'DuplicateError') {
          res.status(500).send(`${err.name}: A project with the ${err.field} ${req.body.name} already exists.`);
        } else {
          res.status(500).send(`Whoops! The following error occurred: ${err}`);
        }
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// POST preview changes to a project

router.post('/preview', isLoggedIn, (req, res, next) => {
  if(!req.session.projectPreview) {
    req.session.projectPreview = {};
  }

  // Build initial session.projectPreview object
  req.session.projectPreview = {
    name: req.body.name,
    date: req.body.date,
    result_statement: req.body.result_statement,
    description: req.body.description,
    feature_image: {image: req.body.feature_image},
    images: req.body.images_all,
    project_images_sort_order: {images_order: req.body.image_sort_order},
    clients: [],
    collaborators: [],
    project_categories: [],
  };

  // Extract feature image orig_name
  let featImgUrl = req.session.projectPreview.feature_image.image.url;

  req.session.projectPreview.feature_image.image.orig_name = featImgUrl.substr(featImgUrl.lastIndexOf('/') + 1);

  // Check if image objects have 'orig_name' key
  req.body.images_all.forEach(obj => {
    let keys = Object.keys(obj);
    if(!keys.includes('orig_name')) {
      obj.orig_name = obj.url.substr(obj.url.lastIndexOf('/') + 1);
    };
  });

  // Fetch client, collaborator, project_category data from db
  Client
    .where('id', 'IN', req.body.clients_ids_selected)
    .fetchAll()
    .then(clients => {
      req.session.projectPreview.clients = clients;
    })
    .then(() => {
      return Collaborator
        .where('id', 'IN', req.body.collaborators_ids_selected)
        .fetchAll()
        .then(collabs => {
          req.session.projectPreview.collaborators = collabs;
        })
        .catch(err => console.error(err));
    })
    .then(() => {
      return ProjectCategory
        .where('id', 'IN', req.body.project_categories_ids_selected)
        .fetchAll()
        .then(categories => {
          req.session.projectPreview.project_categories = categories;
        })
        .catch(err => console.error(err));
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => console.error(err));

});

// UPDATE a project
router.put('/:id', isLoggedIn, (req, res, next) => {
  const images_ids = req.body.images_ids;
  const images_ids_detach = req.body.images_ids_detach;
  const clients_ids = req.body.clients_ids;
  const clients_ids_detach = req.body.clients_ids_detach;
  const collaborators_ids = req.body.collaborators_ids;
  const collaborators_ids_detach = req.body.collaborators_ids_detach;
  const project_categories_ids = req.body.project_categories_ids;
  const project_categories_ids_detach = req.body.project_categories_ids_detach;
  const users_ids = req.body.users_ids;
  const users_ids_detach = req.body.users_ids_detach;
  const feature_image_id = req.body.feature_image.id;
  const image_sort_order = req.body.image_sort_order;
  const allowedKeys = ['name', 'date', 'result_statement', 'description', 'visible'];
  const formData = params(req.body).only(allowedKeys);
  formData['slug'] = formData.name.toLowerCase().replace(/[^a-zA-Z0-9 ]/gi, '').replace(/ /gi, '-');

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

        if (users_ids_detach) project.users().detach(users_ids_detach);
        if (users_ids) project.users().attach(users_ids);

        // Fetch related images
        project.related('images')
          .fetch()
          .then((images) => {
            // If Project currently has images and is not changing them: return
            if(images.length > 0 && images_ids.length === 0 && images_ids_detach.length === 0) {
              return
            }
            // If Project is removing images
            if(images.length > 0 && images_ids_detach.length > 0) {
              images.forEach(img => {
                let imgJSON = img.toJSON();
                if(images_ids_detach.includes(imgJSON.id)) {
                  img.save({project_id: null}, {method: 'update', patch: true});
                }
              });
            }
            // If Project currently has no images: set images
            if(images_ids.length > 0) {
              images_ids.forEach(imageId => {
                return Image
                  .forge({id: imageId})
                  .fetch()
                  .then(img => {
                    return img.save({project_id: project.id}, {method: 'update', patch: true})
                  });
              });
            };
          });
        // Fetch feature image
        project.related('feature_image')
          .fetch()
          .then((f_image) => {
            if(f_image) {
              let f_imageJSON = f_image.toJSON();

              // If Project currently has feature image and is not changing it: return
              if(f_imageJSON.image_id === feature_image_id) {
                return
              } else {
              // If Project is changing feature image
                return ProjectFeatureImage
                  .forge({id: f_imageJSON.id})
                  .save({image_id: feature_image_id}, {method: 'update', patch: true})
              }
            }

            // If Project currently has no feature image: set feature image
            if(f_image === null && feature_image_id !== '') {
              return ProjectFeatureImage
                .forge({project_id: project.id, image_id: feature_image_id})
                .save();
            }
          });

        // Fetch related image sort order
        project.related('project_images_sort_order')
          .fetch()
          .then(sort_order => {
            if(sort_order !== null) {
              sort_order = sort_order.serialize();
            }
            // If Project currently has no image sort order and image_sort_order is empty
            if(sort_order === null && image_sort_order.length === 0) {
              return
            }
            // If Project currently has no image sort order and image_sort_order needs to be set
            if(sort_order === null && image_sort_order.length > 0) {
              return ProjectImagesSortOrder
                .forge({project_id: project.id, images_order: image_sort_order})
                .save();
            }
            // If Project's image sort order is not changing: return
            if(sort_order.images_order.toString() === image_sort_order.toString()){
              return
            }
            // If Project's image sort order changed
            if(sort_order.images_order.toString() !== image_sort_order.toString()) {
              return ProjectImagesSortOrder
                .forge({id: sort_order.id})
                .save({images_order: image_sort_order}, {method: 'update', patch: true})
            }
          });
        // toJSON
        project = project.toJSON();
        return res.status(200).send(`${project.name} has been updated.`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Whoops! The following error occurred: ${err}`);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// DELETE a project
router.delete('/:id/delete', isLoggedIn, (req, res, next) => {
  const project_name = req.body.name;

  Project
    .forge({id: req.params.id})
    .fetch()
    .then((project) => {
      let relation = project.images();
      let tableName = relation.relatedData.targetTableName;
      let foreignKey = relation.relatedData.key('foreignKey');

      bookshelf.knex(tableName)
        .where(foreignKey, project.id)
        .update({[foreignKey]: null})
        .then(numRows => {
          console.log(`${numRows} have been updated.`)
        })
        .catch(err => {
          console.error('KNEX ERR: ', err);
        });
      return project.destroy();
    })
    .then(() => {
      return res.status(200).send(`${project_name} has been deleted.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Whoops! The following error occurred: ${err}`);
    });
});

module.exports = router;
