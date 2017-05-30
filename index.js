const express = require('express');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const redisClient = redis.createClient();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const knex = require('knex');

const clients = require('./controllers/clients');
const collaborators = require('./controllers/collaborators');
const images = require('./controllers/images');
const index = require('./controllers/index');
const projects = require('./controllers/projects');
const users = require('./controllers/users');

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

// sessions
app.use(session({
  store: new redisStore({client: redisClient, host: 'localhost', port: 6379}),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000}
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
app.use('/api/clients', clients);
app.use('/api/collaborators', collaborators);
app.use('/api/images', images);
app.use('/api/projects', projects);
app.use('/api/users', users);
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
