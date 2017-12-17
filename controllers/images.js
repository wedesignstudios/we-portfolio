const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
const params = require('params');
const multer = require('multer');
const Image = require('../models/image.js');
const isLoggedIn = require('../middleware/isLoggedIn');
const fs = require('fs');
const gm = require('gm');
const imageMagick = gm.subClass({ imageMagick: true });

// AWS config
AWS.config.update({
  region: process.env.region,
  subregion: process.env.region
});

const s3 = new AWS.S3({signatureVersion: 'v4'});

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
    .orderBy('created_at', 'DESC')
    .fetch({
      withRelated: ['project', 'news_story', 'feature_image_project', 'feature_image_project.project'],
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
      withRelated: ['project', 'news_story', 'feature_image_project', 'feature_image_project.project'],
      debug: true
    })
    .then((image) => {
      if(image) {
        res.json(image);
      } else {
        res.json(null);
      }
    })
    .catch((err) => {
      console.log('Error message: ', err);
      res.sendStatus(500);
    });
});

// UPLOAD images to AWS S3 + POST image URL
router.post('/upload', isLoggedIn, upload.single('image'), (req, res, next) => {
  const url = 'https://we-portfolio.s3.amazonaws.com/' + req.file.originalname;

  let updatedBuffer;

  let gmPromise = new Promise((resolve, reject) => {

    imageMagick(req.file.buffer, req.file.originalname)
      // Resolve if SVG
      .identify((err, val) => {
        if (val.format === 'MVG') {
          updatedBuffer = req.file.buffer;
          resolve('SVG file. Skipping GM methods.');
        }
      })
      .autoOrient()
      .noProfile()
      .toBuffer((err, buffer) => {
        if (err) return console.error(err);
        updatedBuffer = buffer;
        resolve('Success!');
      })
  });

  gmPromise
    .then(() => {
      s3.putObject({
        Bucket: 'we-portfolio',
        Key: req.file.originalname,
        Body: updatedBuffer,
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
          .forge({url: url, orig_name: req.file.originalname})
          .save()
          .then((image) => {
            return res.status(200).send(`Image(s) uploaded to S3 and saved to database.`);
          })
          .catch((err) => {
            console.error(err);
            if (err.name == 'DuplicateError') {
              res.status(500).send(`${err.name}: Image ${req.file.originalname} already exists and was not uploaded.`);
            } else {
              res.status(500).send(`Whoops! The following error occurred: ${err}`);
            }
          });
      });
    });
});

// UPDATE an image
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
        res.status(200).send(`Image ${image.url} has been updated.`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Whoops! The following error occurred: ${err}`);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// DELETE an image
router.delete('/:id', isLoggedIn, (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);

  // Delete from S3 bucket
  s3.deleteObject({
    Bucket: 'we-portfolio',
    Key: req.body.orig_name
  }, (err, data) => {
    if(err) {
      console.log('Error message: ', err);
      return res.status(400).send(err);
    }
  })

  // Delete from database
  Image
    .forge({id: req.params.id})
    .destroy()
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Whoops! The following error occurred: ${err}`);
    });
    res.status(200).send(`Image ${req.body.url} deleted.`);
});


module.exports = router;