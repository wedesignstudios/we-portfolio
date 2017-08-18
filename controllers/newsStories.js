const express = require('express');
const router = express.Router();
const params = require('params');
const isLoggedIn = require('../middleware/isLoggedIn');
const bookshelf = require('../db/bookshelf');

const NewsStory = require('../models/news_story');
const Image = require('../models/image');

// GET all news stories
router.get('/', (req, res, next) => {
  NewsStory
    .collection()
    .orderBy('title', 'ASC')
    .fetch({
      withRelated: ['image', 'news_categories'],
      debug: true
    })
    .then((stories) => {
      res.json(stories)
    })
    .catch((err) => {
      console.error('Error message: ', err);
      res.sendStatus(500);
    });
});

// SHOW a news story by ID/slug
router.get('/:param', (req, res, next) => {
  let key;
  let param = req.params.param;

  isNaN(parseInt(param)) ? (key = 'slug') : (key = 'id');

  NewsStory
    .forge({[key]: req.params.param})
    .fetch({
      withRelated: ['image', 'news_categories'],
      debug: true
    })
    .then((story) => {
      if(story) {
        res.json(story);
      } else {
        res.json(null);
      }
    })
    .catch((err) => {
      console.error('Error message: ', err);
      res.sendStatus(500);
    });
});

// CREATE new news story
router.post('/', isLoggedIn, (req, res, next) => {
  const news_categories_ids = req.body.news_categories_ids;
  const image_id = req.body.image_id;
  const allowedKeys = ['title', 'date', 'description'];
  const formData = params(req.body).only(allowedKeys);
  formData['slug'] = formData.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/gi, '').replace(/ /gi, '-');

  if(Object.keys(formData).length != 0) {
    NewsStory
      .forge(formData)
      .save()
      .then((story) => {
        story.news_categories().attach(news_categories_ids);
        story.related('image')
        .fetch()
        .then((image) => {
          if(!image) {
            return Image
              .forge({id: image_id})
              .fetch()
              .then((img) => {
                return img.save({news_story_id: story.id}, {method: 'update', patch: true})
              });
          }
        });
        story = story.toJSON();
        return res.status(200).send(`${story.title} successfully created.`);
      })
      .catch((err) => {
        console.error('Error message: ', err);
        res.send(500).send(`Whoops! The following error occurred: ${err}`);
      });
    } else {
      res.status(400).send('Bad Request');
    };
});

// UPDATE news story
router.put('/:id', isLoggedIn, (req, res, next) => {
  const news_categories_ids = req.body.news_categories_ids;
  const news_categories_ids_detach = req.body.news_categories_ids_detach;
  const storyId = req.params.id;
  const image_id = req.body.image_id;
  const allowedKeys = ['title', 'date', 'description'];
  const formData = params(req.body).only(allowedKeys);
  formData['slug'] = formData.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/gi, '').replace(/ /gi, '-');

  if(Object.keys(formData).length != 0) {
    NewsStory
      .forge({id: req.params.id})
      .save(formData, {method: 'update'})
      .then((story) => {
        // Attach/detach news categories
        if(news_categories_ids_detach) story.news_categories().detach(news_categories_ids_detach);
        if(news_categories_ids) story.news_categories().attach(news_categories_ids);
        // Fetch related image
        story.related('image')
        .fetch()
        .then((image) => {
          // If NewsStory currently has an image and is not changing it: return
          if(image && (image.id === image_id)) {
            return
          }
          // If NewsStory currently has an image and it is changing to a different image: set current image news_story_id to null.
          if(image && (image.id !== image_id)) {
            image.save({news_story_id: null}, {method: 'update', patch: true});
            return Image
              .forge({id: image_id})
              .fetch()
              .then((img) => {
                return img.save({news_story_id: storyId}, {method: 'update', patch: true})
              })
          }
          // If NewsStory currently has no image: set an image
          if(!image) {
            return Image
              .forge({id: image_id})
              .fetch()
              .then((img) => {
                return img.save({news_story_id: storyId}, {method: 'update', patch: true})
              })
          }
        });
        story = story.toJSON();
        return res.status(200).send(`${story.title} has been updated.`)
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(`Whoops! The following error occurred: ${err}`);
      });
  } else {
    res.status(400).send('Bad Request');
  };
});

// DELETE news story
router.delete('/:id/delete', isLoggedIn, (req, res, next) => {
  const story_title = req.body.title;

  NewsStory
    .forge({id: req.params.id})
    .fetch()
    .then((story) => {
      let relation = story.image();
      let tableName = relation.relatedData.targetTableName;
      let foreignKey = relation.relatedData.key('foreignKey');

      bookshelf.knex(tableName)
      .where(foreignKey, story.id)
      .update({[foreignKey]: null})
      .then((numRows) => {
        console.log(`${numRows} have been updated.`)
      })
      .catch((err) => {
        console.error('KNEX ERR: ', err);
      });
      return story.destroy();
    })
    .then(() => {
      return res.status(200).send(`${story_title} has been deleted.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Whoops! The following error occurred: ${err}`);
    });
});

module.exports = router;