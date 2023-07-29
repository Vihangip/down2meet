const ensureAuthenticated = (req, res, next) => {
  console.log("isauthenticated: " + req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnPath = req.path;
  res.redirect('http://localhost:3000'); // Redirect to login if not authenticated
};

module.exports = { ensureAuthenticated };
