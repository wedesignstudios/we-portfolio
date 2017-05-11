const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/image.js');
const s3 = new AWS.S3({signatureVersion: 'v4'});

console.log(s3);

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

// POST images
router.post('/upload', upload.single('image'), (req, res, next) => {
  s3.putObject({
    Bucket: 'we-portfolio',
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read',
    Expires: 120,
    ContentType: req.file.mimetype
  }, (err) => {
    console.log('Error message: ', err);
    if(err) return res.status(400).send(err);
    res.send('File uploaded to S3');
  });
});

module.exports = router;