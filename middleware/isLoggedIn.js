const isLoggedIn = function(req, res, next) {
  if(!req.user) {
    // res.json([]);
    return res.redirect(401, '/login');
  }
  next();
}

module.exports = isLoggedIn;