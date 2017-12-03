#!/usr/bin/env node
require('dotenv').config();

const express = require('express');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const redisClient = redis.createClient();
const passport = require('passport');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const knex = require('knex');

// controllers
const addresses = require('./controllers/addresses');
const clients = require('./controllers/clients');
const collaborators = require('./controllers/collaborators');
const countries = require('./controllers/countries');
const images = require('./controllers/images');
const index = require('./controllers/index');
const newsCategories = require('./controllers/newsCategories');
const newsStories = require('./controllers/newsStories');
const projectCategories = require('./controllers/projectCategories');
const projects = require('./controllers/projects');
const users = require('./controllers/users');
const userData = require('./controllers/user-data');
const loginFacebook = require('./controllers/loginFacebook');
const loginGoogle = require('./controllers/loginGoogle');
const logout = require('./controllers/logout');
const states = require('./controllers/states');
const wpPosts = require('./controllers/wpPosts');
const wpUsers = require('./controllers/wpUsers');

const ENV = process.env.NODE_ENV || 'development';
const config = require('./knexfile');
const db = knex(config[ENV]);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// redis
redisClient.on('connect', function() {
  console.log('Redis connected');
});
redisClient.on('error', function(err) {
  console.log('Redis error: ', err);
});

// sessions
app.use(session({
  store: new redisStore({client: redisClient, host: process.env.REDIS_URL}),
  secret: process.env.REDIS_PW,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// favicon in /public/favicon
app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/api/addresses', addresses);
app.use('/api/clients', clients);
app.use('/api/collaborators', collaborators);
app.use('/api/countries', countries);
app.use('/api/images', images);
app.use('/api/news-categories', newsCategories);
app.use('/api/news-stories', newsStories);
app.use('/api/project-categories', projectCategories);
app.use('/api/projects', projects);
app.use('/api/states', states);
app.use('/api/users', users);
app.use('/api/user-data', userData);
app.use('/api/wp-posts', wpPosts);
app.use('/api/wp-users', wpUsers);
app.use('/login/facebook', loginFacebook);
app.use('/login/google', loginGoogle);
app.use('/logout', logout);
app.use('/*', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');  
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// migrate latest db models
app.up = () => {
  return db.migrate.latest([ENV])
    .then(() => {
      return db.migrate.currentVersion();
    })
    .then((val) => {
      console.log('Done running latest migration:', val);      
    });
  }

module.exports = app;
