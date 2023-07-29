const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route to initiate Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google OAuth login
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = {
        user_id: req.user.user_id,
        name: req.user.name,
        picture: req.user.picture,
        // Add any other relevant user data here
      }
      req.login(req.user, (err) => {
        if (err) {
          console.error('Error during login:', err);
          return res.redirect('https://down2meet.onrender.com');
        }});
    // Redirect to the home page or any other route after successful login
    res.redirect(`https://down2meet.onrender.com/Home`);
  }
);

// Logout route
router.get('/logout', function(req, res, next) {
    // Destroy the session to log the user out
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      console.log("hmm");
      res.status(200).send();
      // Redirect to the client-side route
    });
    // res.redirect('https://down2meet.onrender.com');
});
  

module.exports = router;