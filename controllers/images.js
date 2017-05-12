const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/image.js');
const s3 = new AWS.S3({signatureVersion: 'v4'});

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
router.post('/upload', upload.single('image'), (req, res, next) => {
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

module.exports = router;