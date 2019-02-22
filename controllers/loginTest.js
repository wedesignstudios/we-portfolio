const express = require('express'),
      passport = require('passport'),
      passportLocal = require('passport-local').Strategy,
      router = express.Router(),
      User = require('../models/user'),
      ENV = process.env.NODE_ENV;

passport.use(new passportLocal({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User
      .forge({ username: username })
      .fetch({
        debug: true,
        require: false
      })
      .then(user => {
        if(!user) { return done(null, false); }
        return done(null, user);
      })
      .catch(err => {
        console.error(err);
      })
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

if(ENV === 'test') {
  router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
      req.session.cookie.user = req.user;
      res.redirect('/');
    });
} else {
  router.post('/', (req, res) => {
    res.redirect(403, '/login');
  });
}

module.exports = router;
