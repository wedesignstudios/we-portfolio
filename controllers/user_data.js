const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  if(!req.user) {
    res.json([]);
  } else {
    res.json([req.user]);
  }
});

module.exports = router;