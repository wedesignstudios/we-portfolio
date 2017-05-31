const express = require('express');
const passport = require('passport');
const passportGoogle = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router();
const User = require('../models/user');

passport.use(new passportGoogle({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/google/callback'
  },
  function(token, tokenSecret, profile, cb) {
    User
      .forge({username: profile.emails[0].value})
      .fetch({
        debug: true,
        require: false
      })
      .then((user) => {
        if(!user) {
          return cb(null, false);
        }
        return cb(null, user);
      })
      .catch((err) => {
        console.log(err);        
      });    
    // return cb(null, profile);
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.get('/', passport.authenticate('google', { scope: 'openid email' }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log('EMAIL: ', req.user.emails[0].value);
    console.log('USER: ', req.user);
    res.send('In Google callback.');
});

module.exports = router;