const AWS = require('aws-sdk');
const express = require('express');
const router = express.Router();
const params = require('params');
const multer = require('multer');
const Image = require('../models/image.js');
const isLoggedIn = require('../middleware/isLoggedIn');
const fs = require('fs');
const gm = require('gm');
const {execFile} = require('child_process');
const gifsicle = require('gifsicle');
const imageMagick = gm.subClass({ imageMagick: true });
const async = require('async');

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

const uploadGif = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'tmp/gifs');
    },
    filename: function(req, file, cb) {
      console.log('FILE: ', file);
      cb(null, file.originalname);
    },
    limits: { fileSize: 52428800 }
  })
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

// Resize Gif images with Gifsicle and push to AWS S3 we-portfolio-resized
router.post('/upload/gif', isLoggedIn, uploadGif.single('image'), (req, res, next) => {
    const gifObj = req.file;
    // Infer the image name
    const nameMatch = gifObj.filename.match(/^(.*?)\./);
    // Get gif local path
    const filePath = gifObj.path;
    // Get AWS S3 URL
    const url = 'https://we-portfolio.s3.amazonaws.com/' + gifObj.filename;

    const resizeConfig = [
        {
          width: 300,
          dstKey: '300/' + nameMatch[1] + '_300w.gif'
        },
        {
          width: 450,
          dstKey: '450/' + nameMatch[1] + '_450w.gif'
        },
        {
          width: 600,
          dstKey: '600/' + nameMatch[1] + '_600w.gif'
        },
        {
          width: 800,
          dstKey: '800/' + nameMatch[1] + '_800w.gif'
        },
        {
          width: 1024,
          dstKey: '1024/' + nameMatch[1] + '_1024w.gif'
        },
        {
          width: 1440,
          dstKey: '1440/' + nameMatch[1] + '_1440w.gif'
        },
        {
          width: 300,
          dstKey: 'thumb/' + nameMatch[1] + '_thumb_300.gif',
          thumb: true
        },
        {
          width: 180,
          dstKey: 'thumb/' + nameMatch[1] + '_thumb_180.gif',
          thumb: true
        }
    ];

    var origWidth, origHeight;

    async.waterfall([
      function getDimensions(next) {
        imageMagick(filePath)
          .size(function (err, size) {
            if (!err) {
              origWidth = size.width;
              origHeight = size.height;
              next(null, null);
            } else {
              console.log('GM error: ', err);
            }
          });
      },

      function transform(args, next) {
        async.map(resizeConfig, resize, function(err, mapped) {
          next(err, mapped);
        });

        function resize(config, cb) {
          let resizeFlag = '--resize-width';
          let resizeDim = config.width;
          let resizePath = `tmp/gifs/resized/${nameMatch[1]}_${config.width}w.gif`;
          let optionsArr = [resizeFlag, resizeDim, '-O', '--dither', filePath, '-o', resizePath];
          let cropX, cropDim;

          if(config.thumb) {
            // Landscape orientation crop
            cropX = (origWidth / 2) - (origHeight / 2);
            cropDim = `${cropX},0+${origHeight}x${origHeight}`;
            // Portrait orientation crop
            if(origWidth < origHeight) {
              cropX = 0;
              cropDim = `0,0+${origWidth}x${origWidth}`;
            }
            let cropFlag = '--crop';
            resizeFlag = '--resize';
            resizeDim = `${config.width}x${config.width}`;
            resizePath = `tmp/gifs/resized/${nameMatch[1]}_thumb_${config.width}.gif`;
            optionsArr = [cropFlag, cropDim, resizeFlag, resizeDim, '-O', '--dither', filePath, '-o', resizePath];
          }

          execFile(gifsicle, optionsArr, (err, stdout, stderr) => {
            if (err) {
              throw err;
            }
            config.resizePath = resizePath;
            cb(null, config);
          });
        }
      },
      // Push files to S3
      function upload(items, cb) {

        function s3Upload(fileBuffer, s3Bucket, s3Key) {
           s3.putObject({
             Body: fileBuffer,
             Bucket: s3Bucket,
             Key: s3Key,
             ContentType: 'image/gif'
           }, (err, data) => {
             if (err) {
               console.log(err, err.stack);
               return res.status(400).send(err);
             };
          })
        }

        var fileBuffer = fs.readFileSync(filePath);
        var s3Bucket = 'we-portfolio';
        var s3Key = gifObj.filename;

        // Upload original gif to 'we-portfolio' S3 bucket
        s3Upload(fileBuffer, s3Bucket, s3Key);

        // Upload resized gifs to 'we-portfolio-resized' S3 bucket
        async.each(items,
          (item, callback) => {
            fileBuffer = fs.readFileSync(item.resizePath);
            s3Bucket = 'we-portfolio-resized';
            s3Key = item.dstKey;

            s3Upload(fileBuffer, s3Bucket, s3Key);
        },
        (err) => {
          if(err) {
            console.log(err, err.stack);
            return res.status(400).send(err);
          }
        })
        cb(null, items);
      },
      // Delete tmp/gifs
      function deleteTmpGifs(items, cb) {
        // Delete original gif
        fs.unlinkSync(filePath);
        // Delete resized gifs
        items.forEach(item => fs.unlinkSync(item.resizePath));
        cb(null, null);
      },
      function saveToDB(arg, cb) {
        Image
          .forge({url: url, orig_name: gifObj.filename})
          .save()
          .then(() => cb(null, 'Done'))
          .catch((err) => {
            console.error(err);
            if (err.name == 'DuplicateError') {
              res.status(500).send(`${err.name}: Image ${req.file.originalname} already exists and was not uploaded.`);
            } else {
              res.status(500).send(`Whoops! The following error occurred: ${err}`);
            }
          });
      }
    ], function (err, result) {
        if (err) {
          res.status(500).send(`Whoops! The following error occurred: ${err}`);
        } else {
          return res.status(200).send('Gifs uploaded to S3 and saved to database.');
        }
      }
    );
})

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