
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = {
        user_id: req.user.user_id,
        name: req.user.name,
        picture: req.user.picture,
        email: req.user.email,
      }
      req.login(req.user, (err) => {
        if (err) {
          console.error('Error during login:', err);
          return res.redirect(`${process.env.REACT_APP_URL3000}`);
        }});
    res.redirect(`${process.env.REACT_APP_URL3000}/Home`);
  }
);

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).send();
    });
});
  

module.exports = router;