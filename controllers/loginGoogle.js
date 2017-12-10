const express = require('express');
const passport = require('passport');
const passportGoogle = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router();
const User = require('../models/user');
const ENV = process.env.NODE_ENV;
var callbackHost = undefined;

(ENV === 'development') ? (callbackHost = 'http://localhost:3000') : (callbackHost = 'http://we-portfolio.herokuapp.com');

passport.use(new passportGoogle({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${callbackHost}/login/google/callback`
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
    res.header('Access-Control-Allow-Origin', callbackHost);
    res.header('Access-Control-Allow-Credentials', true);
    req.session.cookie.user = req.user;
    res.redirect('/dashboard');
});

module.exports = router;