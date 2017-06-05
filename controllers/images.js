const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
const params = require('params');
const multer = require('multer');
const Image = require('../models/image.js');
const s3 = new AWS.S3({signatureVersion: 'v4'});
const isLoggedIn = require('../middleware/isLoggedIn');

// AWS config
AWS.config.update({
  subregion: process.env.region
});

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

// GET all images
router.get('/', (req, res, next) => {
  Image
    .collection()
    .fetch({
      withRelated: ['project'],
      debug: true
    })
    .then((image) => {      
      res.json(image);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// GET image by ID
router.get('/:id', (req, res, next) => {
  Image
    .forge({id: req.params.id})
    .fetch({
      withRelated: ['project'],
      debug: true
    })
    .then((image) => {      
      res.json(image);
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// UPLOAD images to AWS S3 + POST image URL
router.post('/upload', isLoggedIn, upload.single('image'), (req, res, next) => {
  const url = 'https://we-portfolio.s3.amazonaws.com/' + req.file.originalname;

  s3.putObject({
    Bucket: 'we-portfolio',
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read',
    Expires: 120,
    ContentType: req.file.mimetype
  }, (err, data) => {
    if(err) {
      console.log('Error message: ', err);
      return res.status(400).send(err);
    }
    // Save URL to database
    Image
      .forge({url: url})
      .save()
      .then((image) => {
        res.send('File uploaded to S3 and saved to database.');
      })
      .catch((err) => {
        console.error(err);
        if (err.name == 'DuplicateError') {
          res.status(500).send(`${err.name}: An Image with this ${err.field} already exists.`);
        } else {
          res.sendStatus(500);
        }
      });
  });
});

router.put('/:id', isLoggedIn, (req, res, next) => {
  req.body.project_id === '' ? req.body.project_id = null : req.body.project_id;

  const allowedKeys = ['title', 'alt', 'url', 'project_id', 'index_page'];
  const formData = params(req.body).only(allowedKeys);

  if (Object.keys(formData).length != 0) {
    Image
      .forge({id: req.params.id})
      .save(formData, {method: 'update'})
      .then((image) => {
        image = image.toJSON();
        res.send(`Image ${image.url} has been updated.`);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});


module.exports = router;