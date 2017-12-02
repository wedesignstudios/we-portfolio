const express = require('express');
const passport = require('passport');
const passportFacebook = require('passport-facebook');
const router = express.Router();
const User = require('../models/user');

passport.use(new passportFacebook({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://we-portfolio.herokuapp.com/login/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {    
    User
      .forge({username: profile._json.email})
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
    })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('REQ.USER: ', req.user);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    req.session.cookie.user = req.user;
    res.redirect('/dashboard');
});

module.exports = router;