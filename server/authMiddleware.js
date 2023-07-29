const ensureAuthenticated = (req, res, next) => {
  console.log("isauthenticated: " + req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnPath = req.path;
  res.redirect('https://down2meet.onrender.com'); // Redirect to login if not authenticated
};

module.exports = { ensureAuthenticated };
