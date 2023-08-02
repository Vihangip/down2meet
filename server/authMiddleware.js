require('dotenv').config();

const ensureAuthenticated = (req, res, next) => {
  console.log("isauthenticated: " + req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.returnPath = req.path;
  res.redirect(process.env.REACT_APP_URL3000); // Redirect to login if not authenticated
};

module.exports = { ensureAuthenticated };
